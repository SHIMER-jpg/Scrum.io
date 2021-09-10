const Note = require("../models/Note");
const Task = require("../models/Task");
const mongoose = require("mongoose");

const getNotesByTaskId = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const mongooseId = mongoose.Types.ObjectId(taskId);
    const data = await Note.model.aggregate([
      { $match: { taskId: mongooseId } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
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

const createNote = async (req, res, next) => {
  try {
    const newNote = new Note.model({
      userId: mongoose.Types.ObjectId(req.body.userId),
      taskId: mongoose.Types.ObjectId(req.body.taskId),
      content: req.body.content,
    });
    await newNote.save();
    const task = await Task.model.findOne({
      _id: mongoose.Types.ObjectId(req.body.taskId),
    });
    task.noteIds.push(newNote._id);
    task.save();
    const data = await Note.model.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(newNote._id) } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
    ]);
    res.status(200).json(data[0]);
  } catch (error) {
    next(error);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const noteId = mongoose.Types.ObjectId(req.params.noteId);
    const note = await Note.model.remove({ _id: noteId });
    const task = await Task.model.findOne({ noteIds: { $in: [noteId] } });
    task.noteIds.splice(task.noteIds.indexOf(noteId), 1);
    task.save();
    res.status(200).json("success");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNote,
  getNotesByTaskId,
  deleteNote,
};
