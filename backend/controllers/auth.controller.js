require("dotenv").config({ path: "./.env" });
const User = require("../models/user.model");
const OTP = require("../models/otp");
const { sendEmail, generateOTP } = require("../utils/sendEmail");

exports.signup = async (req, res, next) => {
  try {
    // extract data from request body
    const { firstName, lastName, email, password } = req.body;
    // check username, email and password
    // any of these shouldn't be empty
    if (!firstName || !lastName || !email || !password) {
      return res.status(401).json({
        success: false,
        message: "User information should not be empty.",
      });
    }

    // check whether email is valid or not
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (!regex.test(email)) {
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
    let [found, _] = await User.findByEmailId(email);
    if (found.length > 0) {
      return res
        .status(403)
        .json({ success: false, message: `Email already exist` });
    }

    // register user
    const user = new User(firstName, lastName, email, password);
    const user_otp = generateOTP();
    user.save(user_otp);
    sendEmail(email, firstName, user_otp, "Taskify Email Verification Code");

    // if user saved successfully\
    return res.status(201).json({
      success: true,
      message: `${firstName}, you registered successfully`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res, next) => {
  try {
    // 1st extract email and password from request body
    const { email, password } = req.body;

    // check email and password is not empty
    if (!email || !password) {
      return res
        .status(404)
        .json({ message: "Please provide email and password" });
    }

    const [user, _] = await User.findByEmailId(email);
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
      return res
        .status(404)
        .json({ success: false, message: "Invalid Password" });
    }
    // send token
    sendToken(user[0], 200, res);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.forgetpassword = async (req, res, next) => {
  // 1st extract email from request body
  const { email } = req.body;

  // check email and password is not empty
  if (!email) {
    return res.status(404).json({ message: "Please provide email" });
  }

  try {
    const [user, _] = await User.findByEmailId(email);

    // check, if we have any user with this email
    if (!user[0]) {
      return res
        .status(404)
        .json({ success: false, message: "Email doesn't exist." });
    }

    const otpUser = await OTP.findByEmailId(email);

    var t = new Date();

    let otpCode = Math.floor(Math.random() * 10000 + 1);
    const otpData = new OTP(email, otpCode);
    const response = await sendEmail(user[0].email, user[0].firstName, otpCode);

    if (otpUser) {
      await OTP.updateOTP(user[0].email, otpCode);
    } else {
      await otpData.save();
    }

    if (!response) {
      // don't show full email
      let emailAddress = user[0].email.split("@")[0];
      emailAddress = emailAddress.slice(0, 5);
      emailAddress += ".....@" + user[0].email.split("@")[1];

      return res.status(201).json({
        success: true,
        message: `${user[0].firstName}, please check email at ${emailAddress}`,
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.verifyEmail = async (req, res, next) => {
  try {
    const { verificationCode } = req.body;

    if (verificationCode === "") {
      return res.status(404).json({ message: "Please provide OTP" });
    }

    const [verifiedUser, _] = await User.findByVerificationCode(
      verificationCode
    );

    if (verifiedUser.length <= 0) {
      return res.json({ success: false, message: "invalid verfication code" });
    }

    User.setUserVerificationStatus(1, verificationCode);

    res.status(202).json({
      success: true,
      message: `${verifiedUser[0].email} verified successfully`,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.newVerificationCode = async (req, res, next) => {
  try {
    const { email } = req.body;

    // check whether email is valid or not
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (!regex.test(email)) {
      return res.status(401).json({ success: false, message: "Invalid Email" });
    }

    const otp = generateOTP();
    const updated = await User.newVerificationCode(otp, email);

    if (updated[0].affectedRows === 1) {
      const [user, _] = await User.findByEmailId(email);
      sendEmail(email, user.first_name, otp, "Taskify Email Verification Code");
      res
        .status(202)
        .json({ success: true, message: `verification code sent to ${email}` });
    } else
      res.json({ success: false, message: "something went wrong! try again" });
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

//     await User.updatePassword(user[0].email, confirmPassword);
//     res.status(200).json({ success: true, message: "password updated" });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

const sendToken = (user, statusCode, res) => {
  res.status(statusCode).json({
    success: true,
    token: User.getSignedToken(user),
    userId: user.user_id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    dob: user.dob,
    userType: user.user_type,
    password: user.password,
    verified: user.verified,
  });
};
