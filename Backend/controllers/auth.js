const bcrypt = require("bcrypt");
const { pool } = require("../config/database");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.register = async (req, res, next) => {

  try {
    // extract data from request body
    const { UserID, FirstName, LastName, UserEmail, Password } = req.body;
    console.log(UserID, FirstName, LastName, UserEmail, Password);
    // check username, email and password
    // any of these shouldn't be empty
    if (!FirstName || !LastName || !UserEmail || !Password) {
      return res.status(401).json({
        success: false,
        message: "User information should not be empty.",
      });
    }

    // check whether email is valid or not
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (!regex.test(UserEmail)) {
      return res.status(401).json({ success: false, message: "Invalid Email" });
    }

    // check password length
    if (Password.length > 19 || Password.length < 7) {
      return res.json({
        success: false,
        message: "Password should be 8 to 18 characters long.",
      });
    }

    // if the email already exist
    let [found, _] = await User.findByEmailId(UserEmail);
    if (found.length > 0) {
      return res
        .status(403)
        .json({ success: false, message: `Email already exist` });
    }

    // register user
    const user = new User(UserID, FirstName, LastName, UserEmail, Password);
    console.log(user);
    await user.save();
    // if user saved successfully\
    return res.status(201).json({
      success: true,
      message: `${FirstName}, you registered successfully`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res, next) => {
  // 1st extract email and password from request body
  const { UserEmail, Password } = req.body;
  console.log(UserEmail + " " + Password);

  // check email and password is not empty
  if (!UserEmail || !Password) {
    return res
      .status(404)
      .json({ message: "Please provide email and password" });
  }

  try {
    const [user, _] = await User.findByEmailId();
    // check, if we have any user with this email
    if (!user[0]) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Credentials" });
    }

    // check password
    const isMatched = await User.matchPassword(user[0], Password);
    // if not matched
    if (!isMatched) {
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
    UserID: user.UserID,
    FirstName: user.FirstName,
    LastName: user.LastName,
    UserEmail: user.UserEmail,
    Password: user.Password,
  });
};
