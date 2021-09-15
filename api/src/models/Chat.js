const mongoose = require("mongoose");
const { Schema } = mongoose;
const Message = require("./Message.js");

const chatSchema = new mongoose.Schema({
  projectId: { type: Schema.Types.ObjectId, ref: "Project"},
  messageIds: [{ type: Schema.Types.ObjectId, ref: "Message"}]
});

module.exports = {
  schema: chatSchema,
  model: new mongoose.model("Chat", chatSchema),
};
