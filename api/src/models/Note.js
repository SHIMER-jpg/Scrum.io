const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: {
    type: String,
    required: true,
  },
  creationDate: { type: Date, default: Date.now() },
});

module.exports = {
  schema: noteSchema,
  model: new mongoose.model("Note", noteSchema),
};
