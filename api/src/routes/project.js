const projectsRouter = require("express").Router();
const {
  getProjectById,
  createProject,
  getProjectByUserId,
  deleteProject,
  editProject
} = require("../controllers/project");
// Get project by id.
projectsRouter.get("/project/:projectId", getProjectById);

// get project by userId
projectsRouter.get("/user/:userId", getProjectByUserId);

// post new project
projectsRouter.post("/createProject", createProject);

// post new project
projectsRouter.delete("/:projectId", deleteProject);

//edit project
projectsRouter.put("/edit", editProject)

module.exports = projectsRouter;
