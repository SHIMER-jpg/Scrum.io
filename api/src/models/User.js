const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true, enum: ["scrumMaster", "developer"] },
  //   profileImg: {
  //     data: Buffer,
  //     contentType: String,
  //   },
  // https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/
  // para mas tarde, como storear imagenes
});

module.exports = new mongoose.model("User", userSchema);
