const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserProyectsSchema = new mongoose.Schema({
  proyectId: { type: Schema.Types.ObjectId, ref: "proyect", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  role: { type: String, required: true, enum: ["scrumMaster", "developer"] },
});

module.exports = new mongoose.model("UserProyects", UserProyectsSchema);
