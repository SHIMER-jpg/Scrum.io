const Note = require("../models/Note");



const getNotesByTaskId = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const data = await Note.model.find({ taskId: taskId });
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