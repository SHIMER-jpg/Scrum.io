const { Router } = require("express");
// const { getProjectById } = require("../controllers/projects.js");
const {
  getTasksByProjectId,
  modifyingTask,
  postTask,
  getUserTasks,
} = require("../controllers/task.js");

const task = Router();

// Get project by id.
// Lucero: Esta ruta la tuve que modificar porque el segmento dinamico pisaba el resto de las rutas GET
task.get("/project/:projectId", getTasksByProjectId);

task.post("/createTask", postTask);

// task.put("/:taskId", modifyingTask);

// Obtiene las tareas de un usuario
task.get("/user", getUserTasks);

module.exports = task;
