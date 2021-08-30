const mongoose = require("mongoose");
const { Schema } = mongoose;

const proyectSchema = new mongoose.Schema({
  proyectName: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
  requiredDate: { type: Date }, //, required: true
  scrumMaster: { type: Schema.Types.ObjectId, ref: "User" },
  status: { type: Number, min: 0, max: 100 },
});

module.exports = new mongoose.model("Proyect", proyectSchema);
