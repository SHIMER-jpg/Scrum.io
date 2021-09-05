const Note = require("../models/Note");
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


const postNote = async (req, res, next) => {
  try {
    var newNote = new Note.model({
      userId: req.body.userId,
      content: req.body.content,
    });
    await newNote.save();

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postNote,
  getNotesByTaskId,
};
