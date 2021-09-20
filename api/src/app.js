//Robado del pi
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const formData = require("express-form-data");
const routes = require("./routes/index.js");
const cors = require("cors");
const Task = require("./models/Task.js");
// const { connection } = require("./watchers");

require("./db.js");

const app = express();
const server = require("http").createServer(app);

app.name = "API";

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.urlencoded({ extended: true, limit: "50mb" })); //review if needed
app.use(express.json({ limit: "50mb" })); //review if needed
app.use(cookieParser());
app.use(morgan("dev"));
app.use(formData.parse());

app.use((req, res, next) => {
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});


app.use("/", routes);

module.exports = server;

// const io = require("./socket");
 