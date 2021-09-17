const { Router } = require("express");
// const { getProjectById } = require("../controllers/projects.js");
const {
  getTasksByProjectId,
  modifyTask,
  modifyManyTasks,
  postTask,
  getUserTasks,
  deleteTask,
  deleteSelectedTasks,
  bulkImport,
  bulkRemove,
} = require("../controllers/task.js");

const task = Router();

// Get project by id.
// Lucero: Esta ruta la tuve que modificar porque el segmento dinamico pisaba el resto de las rutas GET
task.get("/project/:projectId", getTasksByProjectId);

task.post("/createTask", postTask);

task.post("/bulkCreate", bulkImport);

task.put("/update", modifyTask);

task.put("/updateMany", modifyManyTasks);

// Obtiene las tareas de un usuario
task.get("/user", getUserTasks);

task.delete("/deleteSelectedTasks", deleteSelectedTasks);

task.delete("/:taskId", deleteTask);

task.delete("/deleteMany/:projectId", bulkRemove);

module.exports = task;
