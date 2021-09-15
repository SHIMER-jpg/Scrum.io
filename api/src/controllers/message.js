const Message = require("../models/Message");
const Chat = require("../models/Chat");
const mongoose = require("mongoose");

const postMessage = async (req, res, next) => {
  try{
    const newMessage = new Message.model({
      userId: mongoose.Types.ObjectId(req.body.userId),
      projectId: mongoose.Types.ObjectId(req.body.projectId),
      content: req.body.content,
    });
    await newMessage.save();
    const chat = await Chat.model.findOne({
      projectId: mongoose.Types.ObjectId(req.body.projectId),
    });
    chat.messageIds.push(newMessage._id);
    chat.save();
    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postMessage,
};
