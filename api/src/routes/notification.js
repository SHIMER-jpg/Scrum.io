const notificationsRouter = require("express").Router();
const {
  getNotificationsByUserId,
  createNotification,
  readAllNotifications,
  readOneNotification,
} = require("../controllers/notification");

// Get all notifications from a user
notificationsRouter.get("/user/:userId", getNotificationsByUserId);

// Create a new notification
notificationsRouter.post("/user/:userId", createNotification);

// Set all notifications as readed
notificationsRouter.put("/user/:userId", readAllNotifications);

// Set a notification as readed
notificationsRouter.put("/user/:userId/:notificationId", readOneNotification);

module.exports = notificationsRouter;
