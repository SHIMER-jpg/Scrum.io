const Task = require("../models/Task");

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
      asignedTo: req.body.user,
      status: req.body.status,
      storyPoints: req.body.storyPoints,
      prorization: req.body.priorization,
      details: req.body.details,
    });
    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

const modifyingTask = async(req, res, next) => {
  try {
    const {taskId} = req.params
    const change = req.body
    const filter = {_id: taskId}
    const update = change
    await Task.model.findOneAndUpdate(filter, update);
    res.status(200).send('Successfully modified task')
  }
  catch(error){
    next(error)
  }
}

module.exports = {
  postTask,
  getTasksByProjectId,
  modifyingTask
  
};
