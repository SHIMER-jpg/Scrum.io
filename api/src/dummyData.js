// const Task = require("./models/Task");
// const Note = require("./models/Note");
// const Proyect = require("./models/Proyect");
// const User = require("./models/User");
// const UserProyect = require("./models/UserProyects");

// const newUserManager = new User.model();
// newUserManager.username = "Lamaolo";
// newUserManager.name = "Lucero";
// newUserManager.email = "lamaolo@gmail.com";
// newUserManager.save();

// const newUserDev = new User.model();
// newUserDev.username = "fedeJava";
// newUserDev.name = "Federico";
// newUserDev.email = "fedeJavaz@gmail.com";
// newUserDev.save();

// const newNoteOne = new Note.model();
// newNoteOne.userId = newUserDev._id;
// newNoteOne.content =
//   "hiSFHUAJDShiSFHUAJDShiSFHUAJDShiSFHUAJDShiSFHUAJDShiSFHUAJDS";

// const newNoteTwo = new Note.model();
// newNoteTwo.userId = newUserManager._id;
// newNoteTwo.content = "ahjdgjnfalsnsdkkfahjdgjnfalsnsdkkfahjdgjnfalsnsdkkf";

// const newTaskOne = new Task.model();
// newTaskOne.title = "Task One";
// newTaskOne.asignedTo = newUserDev._id;
// newTaskOne.storyPoints = 10;
// newTaskOne.priorization = "Easy Win";
// newTaskOne.notes.push(newNoteOne);
// newTaskOne.notes.push(newNoteTwo);

// const newTaskTwo = new Task.model();
// newTaskTwo.title = "Task Two";
// newTaskTwo.asignedTo = newUserDev._id;
// newTaskTwo.storyPoints = 40;
// newTaskTwo.priorization = "Strategic Initiative";
// newTaskTwo.helpNeeded = true;

// const newProyect = new Proyect.model();
// newProyect.proyectName = "Dummy Proyect";
// newProyect.sprintCount = 4;
// newProyect.currentSprint = 1;
// newProyect.sprintDuration = 2;
// newProyect.status = 10;
// newProyect.tasks.push(newTaskOne);
// newProyect.tasks.push(newTaskTwo);
// newProyect.save();

// const newUserProyect = new UserProyect();
// newUserProyect.proyectId = newProyect._id;
// newUserProyect.userId = newUserManager._id;
// newUserProyect.role = "scrumMaster";
// newUserProyect.save();

// const newUserProyectDev = new UserProyect();
// newUserProyectDev.proyectId = newProyect._id;
// newUserProyectDev.userId = newUserDev._id;
// newUserProyectDev.role = "developer";
// newUserProyectDev.save();
