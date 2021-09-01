const { Router } = require("express");
const { getProjectById } = require("../controllers/projects.js");
const task = Router();

// Get project by id.
task.get("/:projectId", getProjectById);

module.exports = task;
