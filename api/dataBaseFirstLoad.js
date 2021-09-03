const User = require("./src/models/User");
const Project = require("./src/models/Project.js");
const Task = require("./src/models/Task");
const Note = require("./src/models/Note");
const mongoose = require("mongoose");
const dataProject = require("./_mocks_/mockProjects");
const dataTask = require("./_mocks_/mockTasks");

const dataBaseFirstLoad = () => {
  const firstProject = Project.model(dataProject[0]);

  //FETCHEAR USUARIOS DE LA DB
  //ASIGNAR ROLES A LOS USUARIOS CON EL PROYECTO
  //ASIGNAR USUARIOS A TASKS
  dataTask.map((task) => {
    const newTask = Task.model(task);
    newTask.projectId = firstProject._id;
    //newTask.save()
  });
  const taskIds = dataTask.map((task) =>
    mongoose.Types.ObjectId(task._id["$oid"])
  );

  firstProject.taskIds = taskIds;
  console.log(firstProject);
  //   firstProject.save()
};

module.exports = dataBaseFirstLoad;
