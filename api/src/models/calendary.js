const mongoose = require("mongoose");
const { Schema } = mongoose;

const EventSchema = new mongoose.Schema({
    start: Date,
    end: Date,
    title: String
})

const Event = mongoose.model("Event", EventSchema)

module.exports = Event ;
