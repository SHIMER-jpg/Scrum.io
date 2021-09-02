const mongoose = require("mongoose");

const Task = require("./Task");

const proyectSchema = new mongoose.Schema({
  proyectName: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
  requiredDate: { type: Date }, //, required: true
  description: { type: String },
  sprintCount: { type: Number, required: true },
  currentSprint: { type: Number, required: true },
  sprintDuration: { type: Number, required: true },
  status: { type: Number, min: 0, max: 100 },
  tasks: [Task.schema],
});

module.exports = {
  schema: proyectSchema,
  model: new mongoose.model("Proyect", proyectSchema),
};
