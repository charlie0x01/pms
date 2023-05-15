const express = require("express");

const {
  addProject,
  getProject,
  updateProject,
  deleteProject,
} = require("../controllers/project.controller");

const router = express.Router();

router.post("/add-project/:orgID", addProject);
router.get("/get-projects/:orgID", getProject);
router.post("/update-project/:projectID", updateProject);
router.delete("/delete-project/:ownerID/:orgID/:projectID", deleteProject);

module.exports = router;
