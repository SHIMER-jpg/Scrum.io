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


const askHelpTask = async(req, res, next) => {
  let taskId = req.body.id
  const filter = { _id: taskId };
  const update = { helpNeeded: true};
  await Task.model.findOneAndUpdate(filter, update);
  res.status(200).send('Successfully modified helpNeeded')
} 

const changeStatusTask = async(req, res, next) => {
  let taskId = req.body.id
  let newStatus  = req.body.status
  const filter = { _id: taskId };
  const update = { status: newStatus};
  await Task.model.findOneAndUpdate(filter, update);
  res.status(200).send('Successfully modified status')
}

const changePriorizationTask = async(req, res, next) => {
  let taskId = req.body.id
  let newPriorization = req.body.priorization
  const filter = { _id: taskId };
  const update = { priorization: newPriorization};
  await Task.model.findOneAndUpdate(filter, update);
  res.status(200).send('Successfully modified priorization')
}


module.exports = {
  postTask,
  getTasksByProjectId,
  
};
