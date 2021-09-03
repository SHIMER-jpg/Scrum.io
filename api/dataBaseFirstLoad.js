const UserProject = require("./src/models/UserProject");
const Project = require("./src/models/Project.js");
const Task = require("./src/models/Task");
const Note = require("./src/models/Note");
const mongoose = require("mongoose");
const dataProject = require("./_mocks_/mockProjects");
const dataTask = require("./_mocks_/mockTasks");
const dataNote = require("./_mocks_/mockNotes");

const shimerUserId = "613272203412af28ea6a5ecb";
const lamaoloUserId = "61326ee7757f3e2669dd4704";

const fabriUserId = "613274bb1a9c7e2b10cfe1c1";
// const fabriUserId = "6132765c35284a1c28692064"; // id blacky

const dataBaseFirstLoad = () => {
  const firstProject = new Project.model(dataProject[0]);

  //FETCHEAR USUARIOS DE LA DB
  //ASIGNAR ROLES A LOS USUARIOS CON EL PROYECTO
  //ASIGNAR USUARIOS A TASKS
  dataTask.map((task) => {
    const newNote = new Note.model(dataNote.pop());
    const newTask = new Task.model(task);
    newNote.taskId = newTask._id;
    newNote.userId = mongoose.Types.ObjectId(fabriUserId);
    newTask.projectId = firstProject._id;
    newTask.asignedTo = mongoose.Types.ObjectId(fabriUserId);
    newTask.noteIds = [newNote._id];
    newNote.save();
    newTask.save();
  });
  const taskIds = dataTask.map((task) =>
    mongoose.Types.ObjectId(task._id["$oid"])
  );

  firstProject.taskIds = taskIds;

  const UserProjectLamaScrum = new UserProject.model({
    projectId: firstProject._id,
    userId: mongoose.Types.ObjectId(lamaoloUserId),
    role: "scrumMaster",
  });

  const UserProjectShimScrum = new UserProject.model({
    projectId: firstProject._id,
    userId: mongoose.Types.ObjectId(shimerUserId),
    role: "scrumMaster",
  });
  const UserProjectFabriDev = new UserProject.model({
    projectId: firstProject._id,
    userId: mongoose.Types.ObjectId(fabriUserId),
    role: "scrumMaster",
  });

  console.log(firstProject);
  UserProjectFabriDev.save();
  UserProjectShimScrum.save();
  UserProjectLamaScrum.save();
  firstProject.save();
};

module.exports = dataBaseFirstLoad;

/**
 * {"_id":{"$oid":"61326ee7757f3e2669dd4704"},"providerId":"google-oauth2|116075231960085539883","picture":"https://lh3.googleusercontent.com/a/AATXAJz0h56xgZgqbZK6EkSlXxngx9FM3wDnogscVz20=s96-c","username":"lamaolo.m","email":"lamaolo.m@gmail.com","name":"Lucero Amaolo","__v":{"$numberInt":"0"}}
 * {"_id":{"$oid":"613272203412af28ea6a5ecb"},"providerId":"google-oauth2|118006313335520775918","picture":"https://lh3.googleusercontent.com/a/AATXAJwuP7kSQD42AmgUgVMEQXTjbYOec0Qyt14Trfq3=s96-c","username":"santiagoalejadiaz","email":"santiagoalejadiaz@gmail.com","name":"Santiago Diaz","__v":{"$numberInt":"0"}}
 * {"_id":{"$oid":"613274bb1a9c7e2b10cfe1c1"},"providerId":"google-oauth2|110735393617398205722","picture":"https://lh3.googleusercontent.com/a-/AOh14GiBqhzXpxVMLa1SGZrhJitCxRuQDFr5WD7ZABfTyg=s96-c","username":"fabriziotessaro02","email":"fabriziotessaro02@gmail.com","name":"Fabrizio Tessaro","__v":{"$numberInt":"0"}}
 * {"_id":{"$oid":"6132765c35284a1c28692064"},"providerId":"google-oauth2|100822617116034096905","picture":"https://lh3.googleusercontent.com/a-/AOh14GisOafBNR-yuu1UwEB3MTf2ZyaTb32qQXgEFZB5OQ=s96-c","username":"cuellojuancruz11","email":"cuellojuancruz11@gmail.com","name":"Cuello Juan cruz","__v":{"$numberInt":"0"}}
 */
