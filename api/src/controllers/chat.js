const Chat = require("../models/Chat");
const Project = require("../models/Project");
const mongoose = require("mongoose");

const getChatByProjectId = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const data = await Chat.model.findOne({
      projectId: mongoose.Types.ObjectId(projectId)
    });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const createChat = async (req, res, next) => {
  try {
    const newChat = new Chat.model({
      projectId: mongoose.Types.ObjectId(req.body.projectId),
      messageIds: [],
    });
    await newChat.save();
    res.status(201).json(newChat);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getChatByProjectId,
  createChat
};
