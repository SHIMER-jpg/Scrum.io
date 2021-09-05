const Task = require("../models/Task");
const mongoose = require("mongoose");

const getTasksByProjectId = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    console.log(projectId);
    const mongooseId = mongoose.Types.ObjectId(projectId);

    // const data = await Task.model.find({ projectId: projectId });
    const data = await Task.model.aggregate([
      { $match: { projectId: mongooseId } },
      {
        $lookup: {
          from: "users",
          localField: "asignedTo",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
    ]);

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

const modifyingTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const change = req.body;
    const filter = { _id: taskId };
    const update = change;
    await Task.model.findOneAndUpdate(filter, update);
    res.status(200).send("Successfully modified task");
  } catch (error) {
    next(error);
  }
};
const getUserTasks = async (req, res, next) => {
  const { projectId, userId } = req.query;

  try {
    // const tasks = await Task.model.find({ assignedTo: userId, projectId });

    const tasks = await Task.model
      .find({ assignedTo: userId, projectId })
      .populate("user")
      .exec();

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postTask,
  getTasksByProjectId,
  modifyingTask,
  getUserTasks,
};
