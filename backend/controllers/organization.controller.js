const User = require("../models/user.model");
const organization = require("../models/organization.model");
const {
  sendInvitaionEmail,
  sendNotificationEmail,
} = require("../utils/sendEmail");

exports.addOrganization = async (req, res, next) => {
  try {
    const { organizationName } = req.body;

    // check
    if (organizationName === "")
      return res.json({
        success: false,
        message: "required data not provided",
      });

    const [orgs, _] = await organization.findByName(organizationName);
    if (orgs.length > 0) {
      return res.json({
        success: false,
        message: "Organization already exist with this name",
      });
    }

    if (organizationName.length <= 2)
      return res.status(500).json({
        success: false,
        message: "organization name must contains 3 characters",
      });

    // create new organization
    const org = new organization(organizationName, req.params.userId);
    org.save();

    return res.status(201).json({
      success: true,
      message: "organization successfully created",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};

exports.getOrganizations = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const [orgs, _] = await organization.findByUserId(userId);
    if (orgs.length <= 0) {
      return res.status(404).json({
        success: true,
        message: "Create new organization",
      });
    }
    return res.status(200).json({
      success: true,
      data: orgs,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};

exports.getOrganization = async (req, res, next) => {
  try {
    const orgId = req.params.orgId;
    const [orgs, _] = await organization.findByOrganizationID(orgId);

    if (orgs.length <= 0)
      return res
        .status(404)
        .json({ success: false, message: "Organization not found!!" });
    return res.status(200).json({
      success: true,
      data: orgs[0],
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};

exports.updateOrganization = async (req, res, next) => {
  try {
    const { orgId, userId } = req.params;
    const { organizationName, description } = req.body;

    if (organizationName === "" || description === "")
      return res.json({
        success: false,
        message: "Required data not provided",
      });

    await organization.updateOrganization(orgId, organizationName, description);

    return res.status(201).json({
      success: true,
      message: "Organization updated successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};

exports.deleteOrganization = async (req, res, next) => {
  try {
    // check
    const { orgId, userId } = req.params;

    organization.deleteOrganization(orgId, userId);
    return res.status(201).json({
      success: true,
      message: "Organization deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};

// add member
exports.addMember = async (req, res, next) => {
  try {
    // get orgId and UserId
    const { orgId, userId } = req.params;
    const { email } = req.body;

    // now check org owner
    const [org, __] = await organization.findByOrganizationID(orgId);
    if (org.length <= 0) {
      return res
        .status(404)
        .json({ success: false, message: "Organization doesn't exist" });
    }

    // check owner
    if (org[0].org_owner != userId) {
      return res.status(404).json({
        success: false,
        message: "only owner can add members to the organization",
      });
    }
    // check if any user exist with the given email
    const [user, _] = await User.findByEmailId(email);

    if (user.length <= 0) {
      const [sender, _fields] = await User.findByUserId(org[0].org_owner);
      // send email to given email address
      sendNotificationEmail(
        email,
        "Hello Dear,",
        `${sender[0].first_name} ${sender[0].last_name} invited you to join ${org[0].org_name} on Taskify.
      To join ${org[0].org_name}, use this join code ${org[0].joining_code}
      To register, click on the following link: http://localhost:5173/signup
      `
      );
      return res.json({
        success: true,
        message: `Invitation email is sent to ${email}`,
      });
    }
    // owner can not be added as member
    if (org[0].org_owner == user[0].user_id) {
      return res.json({
        success: false,
        message: "owner can not be a member",
      });
    }

    // check if user already member
    const [found, ___] = await organization.findByMemberAndOrganizationId(
      orgId,
      user[0].user_id
    );
    if (found.length > 0) {
      return res.status(404).json({
        success: false,
        message: `${email} is already a member`,
      });
    }

    // add member
    organization.addMember(orgId, user[0].user_id);

    // send invitation email to new member
    const [invitedby, ____] = await User.findByUserId(userId);
    if (invitedby.length <= 0) {
      return res.status(401).json({
        success: false,
        message: `unauthorized user`,
      });
    }

    sendInvitaionEmail(
      email,
      `Hi ${user[0].first_name} ${user[0].last_name}`,
      `${invitedby[0].first_name} ${invitedby[0].last_name}`,
      org[0].joining_code,
      org[0].org_name
    );

    return res
      .status(201)
      .json({ success: true, message: `Join code sent to ${email}` });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};

exports.joinOrganization = async (req, res, next) => {
  try {
    const { memberId } = req.params;
    const { joiningCode } = req.body;

    const [org, _] = await organization.findByJoiningCode(joiningCode);
    if (org.length <= 0) {
      return res.status(404).json({
        success: false,
        message: "invalid join code",
      });
    }

    if (org[0].org_id == memberId) {
      return res.status(404).json({
        success: false,
        message: "Owner cannot be the member",
      });
    }

    const [found, __] = await organization.findByMemberAndOrganizationId(
      org[0].org_id,
      memberId
    );

    if (found.length <= 0) {
      await organization.addMember(org[0].org_id, memberId);
    } else if (found[0].member_status === 1) {
      return res.status(404).json({
        success: false,
        message: "You're already a member",
      });
    }

    await organization.joinOrganization(org[0].org_id, memberId);

    // send notification email to organization owner
    const [owner, ___] = await User.findByUserId(org[0].org_owner);
    const [member, _fileds] = await User.findByUserId(memberId);
    sendNotificationEmail(
      owner[0].email,
      `${org[0].org_name} Notification`,
      `Hi ${owner[0].first_name} ${owner[0].last_name}
    ${member[0].first_name} ${member[0].last_name} joined the ${org[0].org_name}
    `,
      res
    );

    return res.status(200).json({
      success: true,
      message: `Joined ${org[0].org_name}`,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};

exports.getMembers = async (req, res, next) => {
  try {
    // find organization
    const [org, _] = await organization.findByOrganizationID(req.params.orgId);
    if (org.length <= 0) {
      return res.status(404).json({
        success: false,
        message: "organization doesn't exist",
      });
    }

    // get members
    const [members, __] = await organization.getMembers(req.params.orgId);
    return res.status(200).json({ success: true, data: members });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};

exports.removeMember = async (req, res, next) => {
  try {
    const { orgId, memberId, userId } = req.params;

    // find org by id
    const [org, _] = await organization.findByOrganizationID(orgId);
    if (org.length <= 0) {
      return res.status(404).json({
        success: false,
        message: "organization doesn't exist",
      });
    }

    // only org owner can add or remove members
    if (org[0].org_owner != userId) {
      return res.status(404).json({
        success: false,
        message: "only owner can remove members",
      });
    }

    // check member exist or not
    const [found, __] = await organization.findByMemberAndOrganizationId(
      orgId,
      memberId
    );
    if (found.length <= 0) {
      return res.status(404).json({
        success: false,
        message: "member not found",
      });
    }

    // remove member
    await organization.removeMember(orgId, memberId);

    return res
      .status(200)
      .json({ success: true, message: "member removed successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};
