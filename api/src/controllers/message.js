const Message = require("../models/Message");
const Chat = require("../models/Chat");
const mongoose = require("mongoose");

const getMessagesByChatId = async (req, res, next) => {
  try {
    const data = await Message.model.find({ chatId: req.body.chatId })
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const postMessage = async (req, res, next) => {
  try{
    const newMessage = new Message.model({
      userId: mongoose.Types.ObjectId(req.body.userId),
      chatId: mongoose.Types.ObjectId(req.body.chatId),
      content: req.body.content,
    });
    await newMessage.save();
    const chat = await Chat.model.findOne({
      _id: mongoose.Types.ObjectId(req.body.chatId),
    });
    chat.messageIds.push(newMessage._id);
    chat.save();
    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMessagesByChatId,
  postMessage,
};
