const express = require("express");
const router = express.Router();

const {
  updateUserProfile,
  getUserInfo,
  profileChange,
  deleteUser,
} = require("../controllers/user.controller");

// update user profile
router.patch("/update-user-profile/:userId", updateUserProfile);
router.get("/get-user/:userId", getUserInfo);
router.delete("/delete-user/:userId", deleteUser);
router.post("/profile-change", profileChange);

module.exports = router;
