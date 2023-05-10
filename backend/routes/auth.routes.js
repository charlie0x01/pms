const express = require("express");

const {
  signup,
  login,
  forgetpassword,
  verifyEmail,
  newVerificationCode,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/forgetpassword", forgetpassword);
router.post("/verifyemail", verifyEmail);
router.post("/new-verification-code", newVerificationCode);

module.exports = router;
