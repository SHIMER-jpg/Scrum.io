const { Router } = require("express");

const chat = Router();
const {
  getChatByProjectId,
  createChat,
} = require("../controllers/chat.js");

//Gets a specific chat by project
chat.get("/:projectId", getChatByProjectId);
//Creates a chat for a project
chat.post("/createProjectChat", createChat);

module.exports = chat;
