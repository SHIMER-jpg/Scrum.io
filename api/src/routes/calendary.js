const { Router } = require("express");
// const { getProjectById } = require("../controllers/projects.js");
// const { getTasksByProjectId } = require("../controllers/task.js");
const calendary = Router();

const { getEvent, createEvent } = require("../controllers/calendary");

calendary.post("/createEvent", createEvent);

calendary.get("/getEvent/:projectId", getEvent);

module.exports = calendary;
