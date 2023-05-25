require("dotenv").config({ path: "../.env" });
const User = require("../models/user.model");
const Organization = require("../models/organization.model");
const Project = require("../models/project.model");
const jwt = require("jsonwebtoken");

exports.addProject = async (req, res, next) => {
  try {
    const orgId = req.params.orgId;
    const { email, projectTitle } = req.body;

    // check
    if (orgId === "" || email === "" || projectTitle === "")
      return res.json({
        success: false,
        message: "required data not provided",
      });

    if (projectTitle.length <= 2)
      return res.status(500).json({
        success: false,
        message: "Project name must contains 3 characters",
      });

    const [user, _] = await User.findByEmailId(email);
    // check, if we have any user with this email
    if (user.length <= 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
    const currentDate = new Date();
    // create new project
    const project = new Project(
      orgId,
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

exports.getProjects = async (req, res, next) => {
  try {
    const { orgId, userId } = req.params;
    const [projects, _] = await Project.findByUserId(orgId, userId);
    console.log(projects);
    if (projects.length <= 0)
      return res
        .status(404)
        .json({ success: false, message: "You don't have any projects yet" });

    return res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    const { ownerId, orgId, projectId } = req.params;
    const { description, projectTitle } = req.body;
    // check
    if (description === "" || projectTitle === "")
      res.json({ success: false, message: "required data not provided" });

    const [user] = await User.findByUserId(ownerId);
    console.log(user);
    // check, if we have any user with this email
    if (user.length <= 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    const [orgs] = await Organization.findByOrganizationID(orgId);
    console.log(orgs);
    // check, if we have any organization with this id
    if (orgs.length <= 0) {
      return res
        .status(404)
        .json({ success: false, message: "Organization not found!" });
    }

    const [projects, _] = await Project.findByProjectID(
      ownerId,
      orgId,
      projectId
    );
    console.log(projects);
    // check, if we have any project with this id
    if (!projects[0]) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found!" });
    }

    await Project.updateProject(
      orgId,
      ownerId,
      description,
      projectTitle,
      projectId
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
  const { ownerId, orgId, projectId } = req.params;
  try {
    const [user] = await User.findByUserId(ownerId);
    // check, if we have any user with this email
    if (user.length <= 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    const [orgs] = await Organization.findByOrganizationID(orgId);
    // check, if we have any organization with this id
    if (orgs.length <= 0) {
      return res
        .status(404)
        .json({ success: false, message: "Organization not found!" });
    }

    const [projects, _] = await Project.findByProjectID(
      ownerId,
      orgId,
      projectId
    );
    // check, if we have any project with this id
    if (!projects[0]) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found!" });
    }

    await Project.deleteProject(ownerId, orgId, projectId);
    return res.status(201).json({
      success: true,
      message: "project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error?.message });
  }
};
