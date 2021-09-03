const projectsRouter = require("express").Router();
const { getProjectById, createProject } = require("../controllers/project");
// Get project by id.
projectsRouter.get("/:projectId", getProjectById);

projectsRouter.post("/createProject", createProject);

module.exports = projectsRouter;
