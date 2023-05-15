const User = require("../models/user.model");
const organization = require("../models/organization.model");

exports.addOrganization = async (req, res, next) => {
  try {
    const { organizationName, email } = req.body;

    // check
    if (organizationName === "" || email === "")
      res.json({ success: false, message: "required data not provided" });

    const [user, _] = await User.findByEmailId(email);
    // create new organization
    const org = new organization(organizationName, user[0].user_id);
    org.save();

    return res.status(201).json({
      success: true,
      message: "organization successfully created",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error?.message });
  }
};

exports.getOrganization = async (req, res, next) => {
  try {
    const owner = req.params.owner;
    const [orgs, _] = await organization.findByOwner(owner);
    return res.status(200).json({
      success: true,
      data: [...orgs],
    });
  } catch (error) {
    throw error;
  }
};
const User = require("../models/user.model");
const organization = require("../models/organization.model");

exports.addOrganization = async (req, res, next) => {
  try {
    const { organizationName, email } = req.body;

    // check
    if (organizationName === "" || email === "")
      res.json({ success: false, message: "required data not provided" });

    const [user, _] = await User.findByEmailId(email);
    // create new organization
    const org = new organization(organizationName, user[0].user_id);
    org.save();
    
    return res.status(201).json({
      success: true,
      message: "organization successfully created",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error?.message });
  }
};

exports.getOrganization = async (req, res, next) => {
  try {
    const owner = req.params.owner;
    const [orgs, _] = await organization.findByOwner(owner);
    return res.status(200).json({
      success: true,
      data: [...orgs],
    });
  } catch (error) {
    throw error;
  }
};

exports.updateOrganization = async (req, res, next) => {
  try {
    const { orgID } = req.params;
    const { description } = req.body;
    const [orgs, _] = await organization.findByOrganizationID(orgID);

    const organizationName = orgs[0].org_name;
    const organizationOwner = orgs[0].org_owner;

    // check
    if (
      organizationName === "" ||
      organizationOwner === "" ||
      description === ""
    )
      res.json({ success: false, message: "required data not provided" });

    await organization.updateOrganization(
      orgID,
      organizationName,
      organizationOwner,
      description
    );
    return res.status(201).json({
      success: true,
      message: "organization updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error?.message });
  }
};

exports.deleteOrganization = async (req, res, next) => {
  const { orgID, ownerID } = req.params;

  try {
    // check
    if (orgID === "" || ownerID === "")
      res.json({ success: false, message: "required data not provided" });

    const [orgs, _] = await organization.findByOrganizationID(orgID);

    // check, if we have any organization with this id
    if (!orgs[0]) {
      return res
        .status(404)
        .json({ success: false, message: "Organization not found!" });
    }
    await organization.deleteOrganization(orgID, ownerID);
    return res.status(201).json({
      success: true,
      message: "organization deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error?.message });
  }
};
