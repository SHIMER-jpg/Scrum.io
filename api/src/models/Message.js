const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: {
    type: String,
    required: true,
  },
  timeStamp: { type: Date, default: Date.now() },
  projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
});

module.exports = {
  schema: messageSchema,
  model: new mongoose.model("Message", messageSchema),
};
