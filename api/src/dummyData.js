const Task = require("./models/Task");
const Note = require("./models/Note");
const Project = require("./models/Project");
const User = require("./models/User");
const UserProject = require("./models/UserProject");

const newUserManager = new User.model();
newUserManager.username = "Lamaolo";
newUserManager.name = "Lucero";
newUserManager.email = "lamaolo@gmail.com";
newUserManager.save();

const newUserDev = new User.model();
newUserDev.username = "fedeJava";
newUserDev.name = "Federico";
newUserDev.email = "fedeJavaz@gmail.com";
newUserDev.save();

const newNoteOne = new Note.model();
newNoteOne.userId = newUserDev._id;
newNoteOne.content =
  "hiSFHUAJDShiSFHUAJDShiSFHUAJDShiSFHUAJDShiSFHUAJDShiSFHUAJDS";

const newNoteTwo = new Note.model();
newNoteTwo.userId = newUserManager._id;
newNoteTwo.content = "ahjdgjnfalsnsdkkfahjdgjnfalsnsdkkfahjdgjnfalsnsdkkf";

const newTaskOne = new Task.model();
newTaskOne.title = "Task One";
newTaskOne.asignedTo = newUserDev._id;
newTaskOne.storyPoints = 10;
newTaskOne.priorization = "Easy Win";
newTaskOne.notes.push(newNoteOne);
newTaskOne.notes.push(newNoteTwo);

const newTaskTwo = new Task.model();
newTaskTwo.title = "Task Two";
newTaskTwo.asignedTo = newUserDev._id;
newTaskTwo.storyPoints = 40;
newTaskTwo.priorization = "Strategic Initiative";
newTaskTwo.helpNeeded = true;

const newProyect = new Project.model();
newProyect.proyectName = "Dummy Proyect";
newProyect.sprintCount = 4;
newProyect.currentSprint = 1;
newProyect.sprintDuration = 2;
newProyect.status = 10;
newProyect.tasks.push(newTaskOne);
newProyect.tasks.push(newTaskTwo);
newProyect.save();

const newUserProject = new UserProject();
newUserProject.projectId = newProyect._id;
newUserProject.userId = newUserManager._id;
newUserProject.role = "scrumMaster";
newUserProject.save();

const newUserProjectDev = new UserProject();
newUserProjectDev.projectId = newProyect._id;
newUserProjectDev.userId = newUserDev._id;
newUserProjectDev.role = "developer";
newUserProjectDev.save();
