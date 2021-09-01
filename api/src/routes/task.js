const { Router } = require("express");
const { getProjectById } = require("../controllers/projects.js");
const task = Router();
const { postTask } = require("../controllers/task.js");

// Get project by id.
task.get("/:projectId", getProjectById);

task.post("/createTask", postTask);

module.exports = task;
