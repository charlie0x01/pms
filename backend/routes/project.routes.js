const express = require("express");

const {
  addProject,
  getProjects,
  updateProject,
  deleteProject,
  getProject,
  addMember,
  joinProject,
  getMembers,
  removeMember,
  changeUserRole,
} = require("../controllers/project.controller");

const router = express.Router();

router.post("/add-project/:orgId/:userId", addProject);
router.get("/get-projects/:orgId/:userId", getProjects);
router.get("/get-project/:projectId/:userId", getProject);
router.patch("/update-project/:projectId/:ownerId", updateProject);
router.delete("/delete-project/:projectId/:ownerId", deleteProject);

router.post("/add-member/:projectId/:userId/:memberRoleId", addMember);
router.post("/join-project/:userId", joinProject);
router.get("/get-members/:projectId", getMembers);
router.delete("/remove-member/:projectId/:memberId/:userId", removeMember);
router.patch(
  "/change-member-role/:projectId/:memberId/:roleId",
  changeUserRole
);

module.exports = router;
