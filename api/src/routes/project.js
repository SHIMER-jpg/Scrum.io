const projectsRouter = require("express").Router();
const {
  getProjectById,
  createProject,
  getProjectByUserId,
  deleteProject,
  getTeamComp,
  editProject,
} = require("../controllers/project");
// Get project by id.
projectsRouter.get("/project/:projectId", getProjectById);

// get project by userId
projectsRouter.get("/user/:userId", getProjectByUserId);

projectsRouter.get("/teamComp/:projectId", getTeamComp);

// post new project
projectsRouter.post("/createProject", createProject);

// post new project
projectsRouter.delete("/:projectId", deleteProject);

//edit project
projectsRouter.put("/edit", editProject);

module.exports = projectsRouter;
