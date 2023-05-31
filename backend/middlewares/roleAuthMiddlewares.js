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

const organizationRoleAuthorization = (Permissions) => {
  return (req, res, next) => {
    // check if user is owner
    if (Permissions.includes("Owner")) {
    }
    // check for admin rights
    if (Permissions.includes("Admin")) {
    }
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
        const [org, _] = await Organization.find(orgId);
        if (org.length <= 0) {
          return res.status(404).json({
            success: false,
            message: "Organization not found",
          });
        }

        if(org[0].org_user_id != userId) {
            return res.status(401).json({
                success: false,
                message: "unauthorized access",
              });
        }
      }
    }
  };
};

module.exports = { projectRoleAuthorization };
