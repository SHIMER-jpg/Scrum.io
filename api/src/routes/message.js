const { Router } = require("express");

const message = Router();
const {
  postMessage,
  getMessages,
} = require("../controllers/message.js");

//Post a new message on a chat
message.post("/newMessage", postMessage);

//Gets messages from a project
message.get("/getMessages/:projectId", getMessages);
module.exports = message;
