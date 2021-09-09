const { Router } = require("express");
const {
  getUsersByProjectId,
  findOrCreateUser,
  getAllUsers,
  getUserRole,
  assingUsers,
} = require("../controllers/user.js");
const user = Router();

// Get users by project id
user.get("/project", getUsersByProjectId);

//get user role
user.get("/userRole", getUserRole);

// findOrCreate Auth0 user in DB
user.post("/findOrCreate", findOrCreateUser);

// list all users in DB
user.get("/getAll", getAllUsers);

user.put("/assingProject/:projectId", assingUsers);

module.exports = user;
