const { Router } = require("express");

const message = Router();
const {
  getMessagesByChatId,
  postMessage,
} = require("../controllers/message.js");

//Gets all messages from a chat
message.get("/getMessages", getMessagesByChatId);
//Post a new message on a chat
message.post("/newMessage", postMessage);

module.exports = message;
