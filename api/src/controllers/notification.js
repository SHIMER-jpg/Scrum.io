const mongoose = require("mongoose");

const Notification = require("../models/Notification");

const getNotificationsByUserId = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const notifications = await Notification.model
      .find({ userId, readed: false })
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
    const createdNotification = await Notification.model.create({
      userId,
      type,
      content,
      projectId,
    });

    res.status(200).json(createdNotification);
  } catch (e) {
    next(e);
  }
};

const readNotification = async (req, res, next) => {
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

module.exports = {
  getNotificationsByUserId,
  createNotification,
  readNotification
};
