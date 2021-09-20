const mongoose = require("mongoose");
const { Schema } = mongoose;

const advertisementSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now() },
  projectId: { type: Schema.Types.ObjectId },
});

module.exports = {
  schema: advertisementSchema,
  model: new mongoose.model("Advertisement", advertisementSchema),
};