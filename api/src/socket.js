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

// const rooms = [{id: 1, users: [], card: {}}];
const rooms = [];

io.on("connection", (socket) => {
  console.log("socket.io: User connected: ", socket.id);

  socket.on("disconnect", () => {
    console.log("socket.io: User disconnected: ", socket.id);
  });

  socket.on("joinPokerPlanningRoom", ({ projectId, user }) => {
    socket.join(projectId);

    if (!rooms.find((room) => room.id === projectId)) {
      rooms.push({ id: projectId, users: [user], task: null });
    } else {
      if (
        !rooms
          .find((room) => room.id === projectId)
          .users.find((u) => u._id === user._id)
      ) {
        rooms.find((room) => room.id === projectId).users.push(user);
      }
    }

    // io.to(projectId).emit(
    //   "userJoin",
    //   rooms.find((room) => room.id === projectId).users
    // );

    // en vez d emitir solo el usuario recien logueado, emito toda la room de vuelta con toda su info.
    io.to(projectId).emit(
      "userJoined",
      rooms.find((room) => room.id === projectId)
    );

  });

  socket.on("setTask", ({projectId, task}) => {
    const room = rooms.find(r => r.id === projectId);
    console.log("room: ", room)    

    if(room) {
      room.task = task;
      io.to(projectId).emit("newTaskSetted", room)
    }
    
    console.log("ROOM post insert: ", room)
  })

  socket.on("value", ({ value, projectId }) => {
    console.log("value recibida en el backend: ", value);

    io.to(projectId).emit("valueBackend", { value, projectId });
  });
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
