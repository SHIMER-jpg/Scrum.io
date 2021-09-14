const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: {
    type: String,
    required: true,
  },
  timeStamp: { type: Date, default: Date.now() },
  chatId: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
});

module.exports = {
  schema: messageSchema,
  model: new mongoose.model("Message", messageSchema),
};
