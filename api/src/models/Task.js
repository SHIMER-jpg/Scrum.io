const mongoose = require("mongoose");
const { Schema } = mongoose;
const Note = require("./Note.js");

const taskSchema = new mongoose.Schema({
  title: { type: String },
  asignedTo: { type: Schema.Types.ObjectId, ref: "User" },
  creationDate: { type: Date, default: Date.now },
  completedDate: { type: Date },
  status: {
    type: String,
    enum: ["Pending", "In progress", "Completed", "Testing"],
    default: "Pending",
  },
  storyPoints: { type: Number },
  priorization: {
    type: String,
    enum: ["Easy Win", "Depriorize", "Worth Pursuing", "Strategic Initiative"],
  },
  details: { type: String },
  helpNeeded: { type: Boolean, default: false },

  projectId: { type: Schema.Types.ObjectId, ref: "Project" },
  noteIds: [{ type: Schema.Types.ObjectId, ref: "Note" }],
});

module.exports = {
  schema: taskSchema,
  model: new mongoose.model("Task", taskSchema),
};
