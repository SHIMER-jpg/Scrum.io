const { Task } = require("../models/Task");

const postTask = async (req, res, next) => {
  try {
    var newTask = new Task({
      title: req.body.title,
      asignedTo: req.body.user,
      status: req.body.status,
      storyPoints: req.body.storyPoints,
      prorization: req.body.priorization,
      details: req.body.details,
      proyect: req.body.proyect,
    });
    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postTask,
};
