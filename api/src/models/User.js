const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    // validate: [
    //   { validator: validators.notEmpty, msg: "Email is empty" },
    //   { validator: validators.isEmail, msg: "Invalid email" },
    // ],
  },
  providerId: { type: String },
  picture: { type: String },
  // password: { type: String },
});

//falta agregar validacion de email, y passwords
module.exports = {
  schema: userSchema,
  model: new mongoose.model("User", userSchema),
};
