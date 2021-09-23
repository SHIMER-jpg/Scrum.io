const Notification = require("../models/Notification");

const getNotificationsByUserId = async (req, res, next) => {
  const { userId } = req.params;
  const { isReaded } = req.query;

  const query = { userId };

  if (typeof req.query.isReaded !== "undefined") {
    query.readed = isReaded === "false" ? false : true;
  }

  try {
    const notifications = await Notification.model
      .find(query)
      .populate("projectId")
      .exec();

    res.status(200).json(notifications);
  } catch (e) {
    next(e);
  }
};

const createNotification = async (req, res, next) => {
  const { userId } = req.params;
  const { type, content, projectId } = req.body;

  try {
    // const createdNotification = await Notification.model.create({
    //   userId,
    //   type,
    //   content,
    //   projectId,
    // });

    res.status(200).json("createdNotification");
  } catch (e) {
    next(e);
  }
};

const readAllNotifications = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const editedNotifications = await Notification.model.updateMany(
      { userId },
      { readed: true }
    );

    res.status(200).json(editedNotifications);
  } catch (e) {
    next(e);
  }
};

const readOneNotification = async (req, res, next) => {
  const { userId, notificationId } = req.params;

  try {
    const editedNotifications = await Notification.model.updateMany(
      { userId, _id: notificationId },
      { readed: true }
    );

    res.status(200).json(editedNotifications);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getNotificationsByUserId,
  createNotification,
  readAllNotifications,
  readOneNotification,
};
