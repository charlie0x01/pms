const express = require("express");
const {
  organizationRoleAuthorization,
} = require("../middlewares/roleAuthMiddlewares");

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
  changeUserRole,
} = require("../controllers/organization.controller");

const router = express.Router();

router.post(
  "/add-organization/:userId",
  organizationRoleAuthorization([], "Add"),
  addOrganization
);
router.get(
  "/get-organizations/:userId",
  organizationRoleAuthorization([], "Get"),
  getOrganizations
);
router.patch(
  "/update-organization/:orgId/:userId",
  organizationRoleAuthorization([], "Update"),
  updateOrganization
);
router.delete(
  "/delete-organization/:orgId/:userId",
  organizationRoleAuthorization([], "Delete"),
  deleteOrganization
);

// not tested
router.get("/get-organization/:orgId/:userId", getOrganization);
router.post("/add-member/:orgId/:userId", addMember);
router.get("/get-members/:orgId", getMembers);
router.delete("/remove-member/:orgId/:memberId/:userId", removeMember);
router.patch("/join-organization/:memberId", joinOrganization);
router.patch("/change-member-role/:ordId/:memberId/:roleId", changeUserRole);

module.exports = router;
