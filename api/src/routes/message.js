const { Router } = require("express");

const message = Router();
const {
  postMessage,
} = require("../controllers/message.js");

//Post a new message on a chat
message.post("/newMessage", postMessage);

module.exports = message;
