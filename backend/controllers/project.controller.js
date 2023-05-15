const User = require("../models/user.model");
const Project = require("../models/project.model");

exports.addProject = async (req, res, next) => {
  const { orgID } = req.params.orgID;
  const { email, projectTitle } = req.body;

  try {
    // check
    if (orgID === "" || email === "" || projectTitle === "")
      res.json({ success: false, message: "required data not provided" });

    const [user, _] = await User.findByEmailId(email);
    // check, if we have any user with this email
    if (!user[0]) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
    const currentDate = new Date();
    // create new project
    const project = new Project(
      orgID,
      user[0].user_id,
      projectTitle,
      currentDate
    );
    project.save();

    return res.status(201).json({
      success: true,
      message: "project created successfully!",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error?.message });
  }
};

exports.getProject = async (req, res, next) => {
  try {
    const orgID = req.params.orgID;
    const [projects, _] = await Project.findByOrganizationID(orgID);
    return res.status(200).json({
      success: true,
      data: [...projects],
    });
  } catch (error) {
    throw error;
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    const { projectID } = req.params;
    const { organizationID, projectOwnerID, description, projectTitle } =
      req.body;

    console.log(
      projectID,
      organizationID,
      projectOwnerID,
      projectTitle,
      description
    );

    // check
    if (
      projectID === "" ||
      organizationID === "" ||
      projectOwnerID === "" ||
      description === "" ||
      projectTitle === ""
    )
      res.json({ success: false, message: "required data not provided" });

    const [projects, _] = await Project.findByProjectID(projectID);
    // check, if we have any project with this id
    if (!projects[0]) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found!" });
    }

    await Project.updateProject(
      organizationID,
      projectOwnerID,
      description,
      projectTitle,
      projectID
    );
    return res.status(201).json({
      success: true,
      message: "project updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error?.message });
  }
};

exports.deleteProject = async (req, res, next) => {
  const { ownerID, orgID, projectID } = req.params;
  try {
    const [projects, _] = await Project.findByProjectID(ownerID, orgID, projectID);
    // check, if we have any project with this id
    if (!projects[0]) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found!" });
    }

    await Project.deleteProject(ownerID, orgID, projectID);
    return res.status(201).json({
      success: true,
      message: "project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error?.message });
  }
};
