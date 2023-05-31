const User = require("../models/user.model");
const Organization = require("../models/organization.model");
const Project = require("../models/project.model");

const roleAuthorization = (Permissions) => {
  return (req, res, next) => {
    const { userRole } = req.body;
    const { userId } = req.params;
    console.log(userId);
    if (!userRole)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    if (Permissions.includes(userRole)) next();
    else
      return res.status(401).json({ success: false, message: "Unauthorized" });
  };
};

const organizationRoleAuthorization = (Permissions, action) => {
  return async (req, res, next) => {
    if (action === "Add" || action === "Get") {
      const { userId } = req.params;
      // find user
      const [user, _] = await User.findByUserId(userId);
      if (user.length <= 0) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return next();
    }

    // update org
    if (action === "Update" || action === "Delete") {
      const { orgId, userId } = req.params;
      const [org, _] = await Organization.findByOrganizationID(orgId);
      console.log(org);
      // now if user is owenr of admin
      const [member, __] = await Organization.findByMemberAndOrganizationId(
        orgId,
        userId
      );
      if (org.length > 0 && org[0].org_owner == userId) {
        return next();
      } else if (
        member.length > 0 &&
        member[0].om_role_id != 3 &&
        member[0].om_role_id != 4
      ) {
        return next();
      }
    }
    //
    return res.status(401).json({
      success: false,
      message: "Unauthorized Request",
    });
  };
};

const projectRoleAuthorization = (Permissions, action) => {
  return async (req, res, next) => {
    console.log(Permissions);
    console.log(req.params);
    console.log(action);

    // add project
    if (action === "Add") {
      const { orgId, userId } = req.params;
      const { projectTitle } = req.body;
      // check if user is owner
      if (Permissions.includes("Owner") || Permissions.includes("Admin")) {
        const [org, _] = await Organization.findByOrganizationID(orgId);
        if (org.length <= 0) {
          return res.status(404).json({
            success: false,
            message: "Organization not found",
          });
        }

        console.log(org);

        // if(org[0].org_user_id != userId) {
        //     return res.status(401).json({
        //         success: false,
        //         message: "unauthorized access",
        //       });
        // }
      }
    }
  };
};

module.exports = { projectRoleAuthorization, organizationRoleAuthorization };
