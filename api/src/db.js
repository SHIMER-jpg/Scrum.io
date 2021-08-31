require("dotenv").config();
const mongoose = require("mongoose");

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const conn = () => {
  mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}`, {
    useNewUrlParser: true,
  });
};


console.log(
  newUserManager,
  newUserDev,
  newUserProyect,
  newUserProyectDev,
  newProyect
  // newTaskOne,
  // newTaskTwo
);

module.exports = {
  conn,
};
