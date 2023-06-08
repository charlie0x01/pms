const express = require("express");
const router = express.Router();

const {
  sendNotification,
  getNotification,
  deleteNotification,
  deleteNotifications,
  broadcast,
} = require("../controllers/notification.controller");

router.post("/send-notification/:to", sendNotification);
router.get("/get-notifications/:to", getNotification);
router.delete("/delete-notification/:notificationId", deleteNotification);
router.delete("/delete-notifications/:to", deleteNotifications);
router.post("/broadcast/:who", broadcast);

module.exports = router;
