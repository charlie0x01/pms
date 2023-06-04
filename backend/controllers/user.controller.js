const User = require("../models/user.model");

exports.updateUserProfile = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { email, firstName, lastName, dob } = req.body;
    console.log(email, firstName, lastName, userId);

    // get user
    const [user, _] = await User.findByUserId(userId);
    if (user.length <= 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // udpate user info
    await User.updateUserInfo(userId, email, firstName, lastName, dob);
    return res.status(200).json({
      success: true,
      message: "User profile updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    // get user
    const [user, _] = await User.findByUserId(userId);
    if (user.length <= 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // delete user
    await User.deleteUser(userId);
    return res.status(200).json({
      success: true,
      message: "User profile Delete successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserRoles = async (req, res) => {
  try {
    const [roles, _] = await User.getUserRoles();
    console.log(roles);
    return res.status(200).json({
      success: true,
      data: roles,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserInfo = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // get user
    const [user, _] = await User.findByUserId(userId);
    if (user.length <= 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user[0],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.profileChange = (req, res, next) => {
  res.send("working");
};
