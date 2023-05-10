const express = require("express");

const {
  addOrganization,
  getOrganization,
} = require("../controllers/organization.controller");

const router = express.Router();

router.post("/add-organization", addOrganization);
router.get("/get-organizations/:owner", getOrganization);

module.exports = router;
