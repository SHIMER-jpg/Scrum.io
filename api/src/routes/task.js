const { Router } = require("express");
// const { getProjectById } = require("../controllers/projects.js");
const {
  getTasksByProjectId,
  modifyTask,
  postTask,
  getUserTasks,
  deleteTask,
  bulkImport,
} = require("../controllers/task.js");

const task = Router();

// Get project by id.
// Lucero: Esta ruta la tuve que modificar porque el segmento dinamico pisaba el resto de las rutas GET
task.get("/project/:projectId", getTasksByProjectId);

task.post("/createTask", postTask);

task.post("/bulkCreate", bulkImport);

task.put("/update", modifyTask);

// Obtiene las tareas de un usuario
task.get("/user", getUserTasks);

task.delete("/:taskId", deleteTask);

module.exports = task;
