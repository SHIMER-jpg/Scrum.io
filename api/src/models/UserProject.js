const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserProjectsSchema = new mongoose.Schema({
  projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  role: { type: String, required: true, enum: ["scrumMaster", "developer"] },
});

module.exports = {
  model: new mongoose.model("UserProjects", UserProjectsSchema),
};
