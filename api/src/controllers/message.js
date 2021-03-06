const Message = require("../models/Message");
const Project = require("../models/Project");
const mongoose = require("mongoose");

const postMessage = async (req, res, next) => {
  try {
    const newMessage = new Message.model({
      userId: mongoose.Types.ObjectId(req.body.userId),
      projectId: mongoose.Types.ObjectId(req.body.projectId),
      content: req.body.content,
    });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const messages = await Message.model
      .find({
        projectId: mongoose.Types.ObjectId(projectId),
      })
      .populate("userId")
      .exec();
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postMessage,
  getMessages,
};
