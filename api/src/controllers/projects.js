const Project = require("../models/Project");
const UserProject = require("../models/UserProject");

// obtiene el proyecto por id
const getProjectById = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const project = await Project.model.findById(projectId);
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

const createProject = async (req, res, next) => {
  try {
    const newProject = new Project.model({
      projectName: req.body.projectName,
      creationDate: req.body.creationDate,
      requiredDate: req.body.requiredDate,
      description: req.body.description,
      sprintCount: req.body.sprintCount,
      currentSprint: req.body.currentSprint,
      sprintDuration: req.body.sprintDuration,
    });

    await newProject.save();

    await UserProject.model.insertMany(
      req.body.Users.map((id) => {
        return {
          projectId: newProject._id,
          userId: id,
          role: "developer",
        };
      })
    );

    const UserAndProject = new UserProject.model({
      userId: req.body.scrumMaster,
      projectId: newProject._id,
      role: "scrumMaster",
    });

    await UserAndProject.save();

    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjectById,
  createProject,
};
