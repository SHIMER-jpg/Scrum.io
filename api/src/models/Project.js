const mongoose = require("mongoose");
const { Schema } = mongoose;

const Task = require("./Task");

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  creationDate: { type: Date, default: Date.now() },
  requiredDate: { type: Date }, //, required: true
  description: { type: String },
  sprintCount: { type: Number, required: true },
  currentSprint: { type: Number, required: true },
  sprintDuration: { type: Number, required: true },
  status: { type: Number, min: 0, max: 100 },
  // tasks: [Task.schema], //quiza sacamos esto,
  taskIds: [{ type: Schema.Types.ObjectId, ref: "Task" }], //quiza sacamos esto,
});

module.exports = {
  schema: projectSchema,
  model: new mongoose.model("Project", projectSchema),
};
