const express = require("express");

const {
  addOrganization,
  getOrganization,
} = require("../controllers/organization.controller");

const router = express.Router();

router.post("/add-organization", addOrganization);
router.get("/get-organizations/:owner", getOrganization);

module.exports = router;
const express = require("express");

const {
  addOrganization,
  getOrganization,
  updateOrganization,
  deleteOrganization,
} = require("../controllers/organization.controller");

const router = express.Router();

router.post("/add-organization", addOrganization);
router.get("/get-organizations/:owner", getOrganization);
router.post("/update-organization/:orgID", updateOrganization);
router.delete("/delete-organization/:orgID/:ownerID", deleteOrganization);

module.exports = router;
