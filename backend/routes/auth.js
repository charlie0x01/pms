const express = require("express");

const { register, login, forgetpassword, validateOTP } = require("../controllers/auth");

const router = express.Router();

router.post("/signup", register);
router.get("/login", login);
router.get("/forgetpassword", forgetpassword);
router.post("/validateOTP", validateOTP);

module.exports = router;