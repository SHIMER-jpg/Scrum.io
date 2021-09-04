const Task = require("../models/Task");
const mongoose = require("mongoose");

const getTasksByProjectId = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const data = await Task.model.find({ projectId: projectId });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const postTask = async (req, res, next) => {
  try {
    var newTask = new Task.model({
      title: req.body.title,
      assignedTo: req.body.assignedTo,
      status: req.body.status,
      storyPoints: req.body.storyPoints,
      priorization: req.body.priorization,
      details: req.body.details,
      projectId: req.body.projectId,
    });

    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postTask,
  getTasksByProjectId,
};
