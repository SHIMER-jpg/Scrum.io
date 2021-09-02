const Project = require("../models/Project");

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
    const newProject = new Project.model(req.body);

    await newProject.save();

    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjectById,
  createProject,
};
