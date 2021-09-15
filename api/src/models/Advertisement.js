const mongoose = require("mongoose");
const { Schema } = mongoose;

const advertisementSchema = new mongoose.Schema({
  title: { 
    type: String, required: true 
  },
  content: {
    type: String,
    required: true,
  },
  Date: { type: Date, default: Date.now() },
  advertisementId: { type: Schema.Types.ObjectId },
});

module.exports = {
  schema: advertisementSchema,
  model: new mongoose.model("advertisement", advertisementSchema),
};