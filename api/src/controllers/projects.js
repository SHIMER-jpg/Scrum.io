const PROJECTS = require("../hardcodingDataBD");

const getProjectById = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    // busco el proyecto que coincida con la id pasada
    const project = PROJECTS.find((pro) => pro.id === projectId);

    // filtro los TODOS que necesiten ayuda y los guardo para enviar en la respuesta
    const todoHelpList = project.todoList.filter((todo) => !!todo.help);

    res.status(200).json(todoHelpList);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjectById,
};
