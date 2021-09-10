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
      from: '"Scrum.io" <scrumio64@gmail.com>', 
      to: user.email,
      subject: "Scrumio", 
      html: `<b>Greetings ${user.name}, through this email we inform you that your scrum master has assigned you a new task, please enter Scrum.io to view it.\n 
      Nice day</b>`, 
    });

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

const modifyTask = async (req, res, next) => {
  try {
    const { taskId } = req.body;
    const update = {};
    update[req.body.field] =
      req.body.field == "asigedTo"
        ? mongoose.Types.ObjectId(req.body.value)
        : req.body.value;

    const updated = await Task.model.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(taskId) },
      update
    );
    res.status(200).send("Successfully modified task");
  } catch (error) {
    next(error);
  }
};

const getUserTasks = async (req, res, next) => {
  const { projectId, userId } = req.query;

  try {
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
  modifyTask,
  getUserTasks,
};
