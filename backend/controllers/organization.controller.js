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
