const Notification = require("../models/notification.model");

exports.sendNotification = async (req, res) => {
  try {
    console.log(req.params);
    console.log(req.body);

    // send notification
    await Notification.saveNotification(req.params.to, req.body.message);
    return res.status(200).json({
      success: true,
      message: "Notification Send",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getNotification = async (req, res) => {
  try {
    const [notifications, _] = await Notification.getNotifications(
      req.params.to
    );
    return res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.deleteNotification = async (req, res) => {
  try {
    console.log(req.params);

    await Notification.deleteNotification(req.params.notificationId);
    return res.status(200).json({
      success: true,
      message: "Deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.deleteNotifications = async (req, res) => {
  try {
    console.log(req.params);
    await Notification.deleteNotifications(req.params.to);
    return res.status(200).json({
      success: true,
      message: "Deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
