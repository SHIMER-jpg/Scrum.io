// const Task = require("./models/Task");
// const Note = require("./models/Note");
// const Project = require("./models/Project");
// const User = require("./models/User");
// const UserProject = require("./models/UserProject");

// //CREO EL USUARIO MANAGER
// const newUserManager = new User.model();
// newUserManager.username = "Lamaolo";
// newUserManager.name = "Lucero";
// newUserManager.email = "lamaolo@gmail.com";

// //CREO EL USUARIO DEV
// const newUserDev = new User.model();
// newUserDev.username = "fedeJava";
// newUserDev.name = "Federico";
// newUserDev.email = "fedeJavaz@gmail.com";

// const newTaskOne = new Task.model();
// newTaskOne.title = "Task One";
// newTaskOne.asignedTo = newUserDev._id;
// newTaskOne.storyPoints = 10;
// newTaskOne.priorization = "Easy Win";

// const newProject = new Project.model();
// newProject.projectName = "Dummy Project";
// newProject.sprintCount = 4;
// newProject.currentSprint = 1;
// newProject.sprintDuration = 2;
// newProject.status = 10;

// const newNoteOne = new Note.model();
// newNoteOne.userId = newUserDev._id;
// newNoteOne.content =
//   "hiSFHUAJDShiSFHUAJDShiSFHUAJDShiSFHUAJDShiSFHUAJDShiSFHUAJDS";

// const newNoteTwo = new Note.model();
// newNoteTwo.userId = newUserManager._id;
// newNoteTwo.content = "ahjdgjnfalsnsdkkfahjdgjnfalsnsdkkfahjdgjnfalsnsdkkf";

// const newTaskTwo = new Task.model();
// newTaskTwo.title = "Task Two";
// newTaskTwo.asignedTo = newUserDev._id;
// newTaskTwo.storyPoints = 40;
// newTaskTwo.priorization = "Strategic Initiative";
// newTaskTwo.helpNeeded = true;

// //ASIIGNACIONES NEW NOTE
// newNoteOne.taskId = newTaskOne._id;
// newNoteTwo.taskId = newTaskOne._id;

// //ASIGNACIONES NEW TASK ONE
// newTaskOne.noteIds.push(newNoteOne._id);
// newTaskOne.noteIds.push(newNoteTwo._id);
// newTaskOne.projectId = newProject._id;

// //ASIGNACIOENS NEW TASK TWO
// newTaskTwo.projectId = newProject._id;

// //ASIGNACIONES DEL PROYECTO
// newProject.taskIds.push(newTaskOne._id);
// newProject.taskIds.push(newTaskTwo._id);

// //ASIGNACIONES DE USUARIO A PROYECTO
// const newUserProject = new UserProject.model();
// newUserProject.projectId = newProject._id;
// newUserProject.userId = newUserManager._id;
// newUserProject.role = "scrumMaster";

// const newUserProjectDev = new UserProject.model();
// newUserProjectDev.projectId = newProject._id;
// newUserProjectDev.userId = newUserDev._id;
// newUserProjectDev.role = "developer";

// newUserManager.save();
// newUserDev.save();
// newNoteOne.save();
// newNoteTwo.save();
// newTaskOne.save();
// newTaskTwo.save();
// newProject.save();
// newUserProject.save();
// newUserProjectDev.save();
