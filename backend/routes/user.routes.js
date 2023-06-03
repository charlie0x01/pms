const express = require("express");
const router = express.Router();

const {
  updateUserProfile,
  getUserInfo,
  profileChange,
  deleteUser,
  getUserRoles
} = require("../controllers/user.controller");

// update user profile
router.patch("/update-user-profile/:userId", updateUserProfile);
router.get("/get-user/:userId", getUserInfo);
router.delete("/delete-user/:userId", deleteUser);
router.post("/profile-change", profileChange);
router.get("/get-user-roles", getUserRoles)

module.exports = router;
