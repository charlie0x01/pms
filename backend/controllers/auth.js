const bcrypt = require("bcrypt");
const { pool } = require("../config/database");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.register = async (req, res, next) => {

  try {
    // extract data from request body
    const { user_id, first_name, last_name, user_email, user_dob, user_type, password } = req.body;
    console.log(user_id, first_name, last_name, user_email, user_dob, user_type, password);
    // check username, email and password
    // any of these shouldn't be empty
    if (!first_name || !last_name || !user_email || !user_dob || !user_type || !password) {
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
    const user = new User(user_id, first_name, last_name, user_email, user_dob, user_type, password);
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
