const { Router } = require("express");
const {
  getUsersByProjectId,
  findOrCreateUser,
} = require("../controllers/user.js");
const user = Router();

// Get users by project id
user.get("/project", getUsersByProjectId);

// findOrCreate Auth0 user in DB
user.post("/findOrCreate", findOrCreateUser);

module.exports = user;
