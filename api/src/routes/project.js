const projectsRouter = require("express").Router();
const {
  getProjectById,
  createProject,
  getProjectByUserId,
  deleteProject,
} = require("../controllers/project");
// Get project by id.
projectsRouter.get("/project/:projectId", getProjectById);

// get project by userId
projectsRouter.get("/user/:userId", getProjectByUserId);

// post nuevo projecto
projectsRouter.post("/createProject", createProject);

// post nuevo projecto
projectsRouter.delete("/:projectId", deleteProject);

module.exports = projectsRouter;
