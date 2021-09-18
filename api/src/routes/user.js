const { Router } = require("express");
const {
  getUsersByProjectId,
  findOrCreateUser,
  getAllUsers,
  getUserRole,
  getUserInfo,
  assignUsers,
  deleteUser,
  gitUserStats,
  editUserInfo,
  gitLanguageStats,
} = require("../controllers/user.js");
const user = Router();

// Get users by project id
user.get("/project", getUsersByProjectId);

//get user role
user.get("/userRole", getUserRole);

//get user role
user.get("/userInfo/:userId", getUserInfo);
user.put("/userInfo/:userId", editUserInfo)

// findOrCreate Auth0 user in DB
user.post("/findOrCreate", findOrCreateUser);

//git stats
user.get("/languageStats/:userId", gitLanguageStats);
user.get("/userStats/:userId", gitUserStats);

// list all users in DB
user.get("/getAll", getAllUsers);

user.put("/assignProject/:projectId", assignUsers);

user.delete("/deleteUser/:projectId", deleteUser);

module.exports = user;
