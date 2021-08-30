const mongoose = require("mongoose");

const proyectSchema = new mongoose.Schema({
  username: { type: String, required: true },
  creationDate: { type: Date },
  requiredDate: { type: Date },
  scrumMaster: { type: Number },
  status: { type: Number, min: 0, max: 100 },
});

module.exports = new mongoose.model("Proyect", proyectSchema);
