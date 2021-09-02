const { Router } = require("express");
const { getUsersByProjectId } = require("../controllers/user.js");
const user = Router();

// Get users by project id
user.get("/project", getUsersByProjectId);

module.exports = user;
