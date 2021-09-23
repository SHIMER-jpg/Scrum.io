
const Task = require("../models/Task");
const Note = require("../models/Note");
const Notification = require("../models/Notification");
const Project = require("../models/Project");
const { updateStatus } = require("./project");
const User = require("../models/User");
const mongoose = require("mongoose");
const csv = require("csvtojson");

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
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const postTask = async (req, res, next) => {
  try {
    await Notification.model.create({
      userId: req.body.assignedTo,
      projectId: req.body.projectId,
      type: "assignedTask"
    })

    var newTask = new Task.model({
      title: req.body.title,
      asignedTo: req.body.assignedTo,
      status: req.body.status,
      storyPoints: req.body.storyPoints,
      priorization: req.body.priorization,
      details: req.body.details,
      projectId: req.body.projectId,
      sprintId: req.body.sprintId,
    });

    await newTask.save();
    updateStatus(req.body.projectId);

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

    if (req.body.field === "status") {
      if (req.body.value === "Completed") {
        update.completedDate = Date.now();
      } else {
        update.completedDate = null;
      }
    }

    if (req.body.field === "asignedTo") {
      const toUpdate = await Task.model.findOne({
        _id: taskId
      })

      await Notification.model.create({
        userId: req.body.value,
        projectId: toUpdate.projectId,
        type: "assignedTask"
      })
    }
    
    const updated = await Task.model.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(taskId) },
      update
    );

    updateStatus(updated.projectId);

    res.status(200).send("Successfully modified task");
  } catch (error) {
    next(error);
  }
};

const modifyManyTasks = async (req, res, next) => {
  try {
    const manyTasksId = req.body.tasksId.map((taskId) =>
      mongoose.Types.ObjectId(taskId)
    );
    const update = req.body.fieldsToChange;
    update.asigedTo
      ? (update.asigedTo = mongoose.Types.ObjectId(update.asigedTo))
      : null;

    if (update.status) {
      if (update.status === "Completed") {
        update.completedDate = Date.now();
      } else {
        update.completedDate = null;
      }
    }

    const updated = await Task.model.updateMany(
      { _id: manyTasksId },
      { $set: update }
    );

    updateStatus(updated.projectId);

    res.status(200).send("Successfully modified tasks");
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

const deleteTask = async (req, res, next) => {
  try {
    const taskId = mongoose.Types.ObjectId(req.params.taskId);
    const updated = await Task.model.remove({ _id: taskId });
    await Note.model.remove({ taskId: taskId });

    updateStatus(updated.projectId);

    res.status(200).json("success");
  } catch (error) {
    next(error);
  }
};

const deleteSelectedTasks = async (req, res, next) => {
  try {
    const manyTasksId = req.body.tasksIdArray.map((taskId) =>
      mongoose.Types.ObjectId(taskId)
    );
    const updated = await Task.model.deleteMany({ _id: manyTasksId });
    await Note.model.deleteMany({ taskId: manyTasksId });

    updateStatus(updated.projectId);

    res.status(200).json("success");
  } catch (error) {
    next(error);
  }
};

const bulkImport = async (req, res, next) => {
  try {
    const json = await csv({ delimiter: ";" }).fromFile(
      req.files["TASK_CSV"].path
    );
    const projectId = mongoose.Types.ObjectId(req.body.projectId);
    const taskDocs = json.map((doc) => {
      const creationDate = doc.creationDate
        ? new Date(doc.creationDate)
        : new Date();
      const completedDate = doc.completedDate
        ? new Date(doc.completedDate)
        : new Date();
      const task = {
        title: doc.title,
        creationDate: creationDate,
        asignedTo: mongoose.Types.ObjectId(doc.asignedTo),
        projectId: projectId,
        completedDate: doc.completedDate,
        status: doc.status,
        storyPoints: doc.storyPoints,
        priorization: doc.priorization,
        details: doc.details,
        sprintId: doc.sprint,
      };
      if (doc.completedDate == "") delete task.completedDate;
      return task;
    });

    await Task.model.insertMany(taskDocs);
    updateStatus(projectId);
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: "error" });
    next(error);
  }
};

const bulkRemove = async (req, res, next) => {
  try {
    const projectId = mongoose.Types.ObjectId(req.params.projectId);
    await Task.model.remove({ projectId: projectId });
    const project = await Project.model.findOne({ _id: projectId });
    project.status = 0;
    project.save();
    res.status(200).json({ message: "deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postTask,
  getTasksByProjectId,
  modifyTask,
  modifyManyTasks,
  getUserTasks,
  deleteSelectedTasks,
  deleteTask,
  bulkImport,
  bulkRemove,
};
