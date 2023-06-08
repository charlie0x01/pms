require("dotenv").config();
const { pool, transaction } = require("../config/database");

exports.saveNotification = async (notifyTo, message) => {
  let saveNt = `insert into notifications(notify_to, message, is_read, created_at) values(?, ?, 1, current_timestamp());`;
  return pool.execute(saveNt, [notifyTo, message]);
};

exports.getNotifications = async (notifyTo) => {
  let getNotifications = `select * from notifications where notify_to = ?;`;
  return pool.execute(getNotifications, [notifyTo]);
};

exports.deleteNotification = async (notificationId) => {
  let deleteNotification = `delete from notifications where notification_id = ?;`;
  return pool.execute(deleteNotification, [notificationId]);
};
exports.deleteNotifications = async (to) => {
  let deleteNotification = `delete from notifications where notify_to = ?;`;
  return pool.execute(deleteNotification, [to]);
};
