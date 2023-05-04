require("dotenv").config({ path: "./.env" });
const bcrypt = require("bcrypt");
const { pool } = require("../config/database");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const OTP = require("../models/otp");
const sendEmail = require("../utils/sendEmail");

exports.register = async (req, res, next) => {
  try {
    // extract data from request body
    const {
      user_id,
      first_name,
      last_name,
      user_email,
      user_dob,
      user_type,
      password,
    } = req.body;
    console.log(
      user_id,
      first_name,
      last_name,
      user_email,
      user_dob,
      user_type,
      password
    );
    // check username, email and password
    // any of these shouldn't be empty
    if (
      !first_name ||
      !last_name ||
      !user_email ||
      !user_dob ||
      !user_type ||
      !password
    ) {
      return res.status(401).json({
        success: false,
        message: "User information should not be empty.",
      });
    }

    // check whether email is valid or not
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (!regex.test(user_email)) {
      return res.status(401).json({ success: false, message: "Invalid Email" });
    }

    // check password length
    if (password.length > 19 || password.length < 7) {
      return res.json({
        success: false,
        message: "Password should be 8 to 18 characters long.",
      });
    }

    // if the email already exist
    let [found, _] = await User.findByEmailId(user_email);
    if (found.length > 0) {
      return res
        .status(403)
        .json({ success: false, message: `Email already exist` });
    }

    // register user
    const user = new User(
      user_id,
      first_name,
      last_name,
      user_email,
      user_dob,
      user_type,
      password
    );
    console.log(user);
    await user.save();
    // if user saved successfully\
    return res.status(201).json({
      success: true,
      message: `${first_name}, you registered successfully`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res, next) => {
  // 1st extract email and password from request body
  const { user_email, password } = req.body;

  // check email and password is not empty
  if (!user_email || !password) {
    return res
      .status(404)
      .json({ message: "Please provide email and password" });
  }

  try {
    const [user, _] = await User.findByEmailId(user_email);
    // check, if we have any user with this email
    if (!user[0]) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Credentials" });
    }

    // check password
    const isMatched = await User.matchPassword(user[0], password);
    // if not matched
    if (!isMatched) {
      console.log("checking password");
      return res
        .status(404)
        .json({ success: false, message: "Invalid Password" });
    }
    console.log(user[0]);
    // send token
    sendToken(user[0], 200, res);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.forgetpassword = async (req, res, next) => {
  // 1st extract email from request body
  const { user_email } = req.body;
  console.log("In Forget Password function");

  // check email and password is not empty
  if (!user_email) {
    return res.status(404).json({ message: "Please provide email" });
  }

  try {
    const [user, _] = await User.findByEmailId(user_email);

    // check, if we have any user with this email
    if (!user[0]) {
      console.log("Checking Email");
      return res
        .status(404)
        .json({ success: false, message: "Email doesn't exist." });
    }

    const otpUser = await OTP.findByEmailId(user_email);

    console.log(user[0]);
    var t = new Date();

    let otpCode = Math.floor(Math.random() * 10000 + 1);
    const otpData = new OTP(user_email, otpCode);
    const response = await sendEmail(
      user[0].user_email,
      user[0].first_name,
      otpCode
    );

    if (otpUser) {
      await OTP.updateOTP(user[0].user_email, otpCode);
    } else {
      await otpData.save();
    }

    if (!response) {
      // don't show full email
      let emailAddress = user[0].user_email.split("@")[0];
      emailAddress = emailAddress.slice(0, 5);
      emailAddress += ".....@" + user[0].user_email.split("@")[1];

      return res.status(201).json({
        success: true,
        message: `${user[0].first_name}, please check email at ${emailAddress}`,
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.validateOTP = async (req, res, next) => {
  const { otp_code, newPassword, confirmPassword } = req.body;
  console.log("Validating OTP & Reset Password");

  if (!otp_code) {
    return res.status(404).json({ message: "Please provide OTP" });
  }

  try {
    const [otpUser] = await OTP.findByOTP(otp_code);

    // check, if we have OTP with this email
    if (!otpUser[0]) {
      return res.status(404).json({ success: false, message: "Incorrect." });
    }
    console.log(otpUser[0]);

    // check passwords are not empty
    if (!newPassword || !confirmPassword) {
      return res.status(404).json({ message: "Password should not be empty." });
    }

    // check passwords are matching or not
    if (newPassword != confirmPassword) {
      return res.status(404).json({ message: "Passwords are not same." });
    }
    console.log(otpUser[0].user_email);
    const [user, _] = await User.findByEmailId(otpUser[0].user_email);

    if (!user[0]) {
      return res
        .status(404)
        .json({ success: false, message: "User doesn't exist." });
    }
    console.log(user[0]);

    await User.updatePassword(user[0].user_email, confirmPassword);
    res.status(200).json({ success: true, message: "Password Updated" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// exports.resetpassword = async (req, res, next) => {
//   const {} = req.body;
//   console.log("In Reset Password Function");

//   // check passwords are not empty
//   if (!newPassword || !confirmPassword) {
//     return res.status(404).json({ message: "Password should not be empty." });
//   }

//   // check passwords are matching or not
//   if (newPassword != confirmPassword) {
//     return res.status(404).json({ message: "Passwords are not same." });
//   }

//   try {
//     console.log(tempEmail);
//     const [user, _] = await User.findByEmailId("hamzakh827@gmail.com");

//     if (!user[0]) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User doesn't exist." });
//     }
//     console.log(user[0]);

//     await User.updatePassword(user[0].user_email, confirmPassword);
//     res.status(200).json({ success: true, message: "password updated" });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

const sendToken = (user, statusCode, res) => {
  res.status(statusCode).json({
    success: true,
    token: User.getSignedToken(user),
    user_id: user.UserID,
    first_name: user.FirstName,
    last_name: user.LastName,
    user_email: user.UserEmail,
    user_dob: user.UserDOB,
    user_type: user.UserType,
    password: user.Password,
  });
};
