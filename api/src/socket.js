// const express = require("express");
// const app = express();
// const server = require("http").createServer(app);
// const io = require("socket.io")(server);
const socketIO = require("socket.io");
const socket = {};
const server = require("./app.js");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("socket.io: User connected: ", socket.id);

  socket.on("disconnect", () => {
    console.log("socket.io: User disconnected: ", socket.id);
  });

  socket.on("value", ({value, projectId}) => {
    console.log("value recibida en el backend: ", value)
    console.log("en el proyecto: ", projectId)

    socket.broadcast.emit("valueBackend", {value, projectId})
  })
});

// const io = require("socket.io")(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// io.of("/api/socket").on("connection", (socket) => {
//   console.log("socket.io: User connected: ", socket.id);

//   socket.on("disconnect", () => {
//     console.log("socket.io: User disconnected: ", socket.id);
//   });
// });

// function connect(server) {
//   socket.io = socketIO(server, {
//     cors: {
//       origin: "*",
//       methods: ["GET", "POST"],
//     },
//   });
// }

module.exports = io;
// module.exports = {
//   connect,
//   socket,
// };
