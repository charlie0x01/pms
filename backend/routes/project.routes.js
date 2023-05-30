const express = require("express");
const authMiddleware = require('../middlewares/authMiddlewares');

const {
  addProject,
  getProjects,
  updateProject,
  deleteProject,
  getProject,
  addMember,
  joinProject,
  getMembers,
  removeMember
} = require("../controllers/project.controller");

const router = express.Router();

router.post("/add-project/:orgId", authMiddleware, addProject);
router.get("/get-projects/:orgId/:userId", authMiddleware, getProjects);
router.get("/get-project/:projectId", getProject);
router.patch("/update-project/:projectId/:ownerId", updateProject);
router.delete("/delete-project/:projectId/:ownerId", deleteProject);

router.post("/add-member/:projectId/:userId", addMember);
router.post("/join-project/:userId", joinProject);
router.get("/get-members/:projectId", getMembers);
router.delete("/remove-member/:projectId/:memberId/:userId", removeMember);

module.exports = router;
