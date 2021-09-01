//Robado del pi
const { conn } = require("./db.js");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const Task = require("./models/Task.js");

require("./db.js");

const server = express();

server.name = "API";

server.use(express.urlencoded({ extended: true, limit: "50mb" })); //review if needed
server.use(express.json({ limit: "50mb" })); //review if needed
server.use(cookieParser());
server.use(morgan("dev"));

try {
  conn();
} catch (error) {
  console.log("error", error);
}

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);

module.exports = server;
