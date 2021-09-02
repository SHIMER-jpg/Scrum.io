const PROJECTS = require("../hardcodingDataBD");
const Project = require("../models/Project.js");

//SANTI: Che, no se si tiene mucho sentido que esto devuelva una list de todos cuando dice devolver el proyecto
// const getProjectById = async (req, res, next) => {
//   try {
//     const { projectId } = req.params;

//     // busco el proyecto que coincida con la id pasada
//     const project = PROJECTS.find((pro) => pro.id === projectId);

//     // filtro los TODOS que necesiten ayuda y los guardo para enviar en la respuesta
//     const todoHelpList = project.todoList.filter((todo) => !!todo.help);

//     res.status(200).json(todoHelpList);
//   } catch (error) {
//     next(error);
//   }
// };
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
