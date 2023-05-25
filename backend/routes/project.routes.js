const express = require("express");

const {
  addProject,
  getProjects,
  updateProject,
  deleteProject,
} = require("../controllers/project.controller");

const router = express.Router();

router.post("/add-project/:orgId", addProject);
router.get("/get-projects/:orgId/:userId", getProjects);
router.patch("/update-project/:ownerId/:orgId/:projectId", updateProject);
router.delete("/delete-project/:ownerId/:orgId/:projectId", deleteProject);

module.exports = router;
