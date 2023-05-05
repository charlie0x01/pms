const express = require("express");

const { signup, login, forgetpassword, validateOTP } = require("../controllers/auth");

const router = express.Router();

router.post("/signup", signup);
router.get("/login", login);
router.get("/forgetpassword", forgetpassword);
router.post("/validateOTP", validateOTP);

module.exports = router;