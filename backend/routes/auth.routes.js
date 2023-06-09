const express = require("express");
const router = express.Router();
const {
  signup,
  verifyEmail,
  newVerificationCode,
  login,
  forgetPassword,
  verifyOTP,
  resetPassword,
} = require("../controllers/auth.controller");

// Registration
router.post("/signup", signup);
// Login
router.post("/login", login);

// User Verification
router.post("/verifyemail", verifyEmail);
router.post("/new-verification-code", newVerificationCode);
// Forget or Reset Password
router.post("/forget-password", forgetPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);

module.exports = router;
