const express = require("express");

const {
  addOrganization,
  getOrganizations,
  getOrganization,
  updateOrganization,
  deleteOrganization,
  addMember,
  getMembers,
  removeMember,
  joinOrganization,
} = require("../controllers/organization.controller");

const router = express.Router();

router.post("/add-organization", addOrganization);
router.get("/get-organizations/:userId", getOrganizations);
router.get("/get-organization/:orgId", getOrganization);
router.patch("/update-organization/:orgId/:userId", updateOrganization);
router.delete("/delete-organization/:orgId/:ownerId", deleteOrganization);
router.post("/add-member/:orgId/:userId", addMember);
router.get("/get-members/:orgId", getMembers);
router.delete("/remove-member/:orgId/:memberId/:userId", removeMember);
router.patch("/join-organization/:memberId", joinOrganization);

module.exports = router;
