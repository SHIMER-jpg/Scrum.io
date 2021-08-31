const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    validate: [
      { validator: validators.notEmpty, msg: "Email is empty" },
      { validator: validators.isEmail, msg: "Invalid email" },
    ],
  },
  role: { type: String, required: true, enum: ["scrumMaster", "developer"] },
  proyects: [{ type: Schema.Types.ObjectId, ref: "Proyect" }],

  // password: []
  //   profileImg: {p
  //     data: Buffer,
  //     contentType: String,
  //   },
  // https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/
  // para mas tarde, como storear imagenes
});

//falta agregar validacion de email, y passwords

module.exports = new mongoose.model("User", userSchema);
