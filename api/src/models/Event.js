const mongoose = require("mongoose");
const { Schema } = mongoose;

const EventSchema = new mongoose.Schema({
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  title: { type: String, required: true },
  projectId: { type: Schema.Types.ObjectId, ref: "Project" },
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
