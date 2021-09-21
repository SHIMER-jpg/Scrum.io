const mongoose = require("mongoose");
const { Schema } = mongoose;

const notificationSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: {
    type: String,
    enum: ["assignedTask", "notification"],
  },
  content: { type: String, required: false },
  projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  readed: { type: Schema.Types.Boolean, default: false },
}, { timestamps: true });

module.exports = {
  schema: notificationSchema,
  model: new mongoose.model("Notification", notificationSchema),
};
