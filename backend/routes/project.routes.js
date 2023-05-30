const express = require("express");

const {
  addProject,
  getProjects,
  updateProject,
  deleteProject,
  getProject,
  addMember,
  joinProject,
} = require("../controllers/project.controller");

const router = express.Router();

router.post("/add-project/:orgId", addProject);
router.get("/get-projects/:orgId/:userId", getProjects);
router.get("/get-project/:projectId", getProject);
router.patch("/update-project/:projectId/:ownerId", updateProject);
router.delete("/delete-project/:projectId/:ownerId", deleteProject);

router.post("/add-member/:projectId/:userId", addMember);
router.post("/join-project/:userId", joinProject);

module.exports = router;
