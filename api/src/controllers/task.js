const { transporter } = require("../nodemailer/nodemailer");

const Task = require("../models/Task");
const User = require ("../models/User")
const mongoose = require("mongoose");


const getTasksByProjectId = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const mongooseId = mongoose.Types.ObjectId(projectId);

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

    // const data = await Task.model
    //   .find({ projectId })
    //   .populate("project")
    //   .exec();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const postTask = async (req, res, next) => {
  try {
    var newTask = new Task.model({
      title: req.body.title,
      asignedTo: req.body.assignedTo,
      status: req.body.status,
      storyPoints: req.body.storyPoints,
      priorization: req.body.priorization,
      details: req.body.details,
      projectId: req.body.projectId,
    });

    await newTask.save();
    const user = await User.model.findOne({
      _id: req.body.assignedTo
    })

    await transporter.sendMail({
      from: '"Scrum.io" <scrumio64@gmail.com>', // sender address
      to: user.email, // list of receivers
      subject: "Scrumio", // Subject line
      text: "Se te ah asignado una nueva tarea" // plain text body
      // html: "<b>Hello world?</b>", // html body
    });

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
    // const tasks = await Task.model.find({ asignedTo: userId, projectId });
    // const tasks = await Task.model
    //   .find({ asignedTo: userId, projectId })
    //   .populate("user")
    //   .exec();
    const projectIdMongoose = mongoose.Types.ObjectId(projectId);
    const userIdMongoose = mongoose.Types.ObjectId(userId);

    const data = await Task.model.aggregate([
      { $match: { projectId: projectIdMongoose, asignedTo: userIdMongoose } },
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

module.exports = {
  postTask,
  getTasksByProjectId,
  modifyingTask,
  getUserTasks,
};
