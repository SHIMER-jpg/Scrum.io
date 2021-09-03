const { Router } = require("express");
const {
  getUsersByProjectId,
  findOrCreateUser,
  getAllUsers,
} = require("../controllers/user.js");
const user = Router();

// Get users by project id
user.get("/project", getUsersByProjectId);

// findOrCreate Auth0 user in DB
user.post("/findOrCreate", findOrCreateUser);

// list all users in DB
user.get("/getAll", getAllUsers);

module.exports = user;
