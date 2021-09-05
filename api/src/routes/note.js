const { Router } = require("express");
// const { getProjectById } = require("../controllers/projects.js");
// const { getTasksByProjectId } = require("../controllers/task.js");
const note = Router();
const { postNote, getNotesByTaskId } = require("../controllers/note.js");

// Get project by id.
// note.get("/:projectId", getTasksByProjectId);
note.get("/:taskId", getNotesByTaskId);

note.post("/:taskId", postNote);

module.exports = note;
