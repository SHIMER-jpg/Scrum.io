const notificationsRouter = require("express").Router();
const {
  getNotificationsByUserId,
  createNotification,
  readNotification,
} = require("../controllers/notification");

// Get all notifications from a user
notificationsRouter.get("/user/:userId", getNotificationsByUserId);

// Create a new notification
notificationsRouter.post("/user/:userId", createNotification);

// Set notifications as readed
notificationsRouter.put("/user/:userId", readNotification);

module.exports = notificationsRouter;
