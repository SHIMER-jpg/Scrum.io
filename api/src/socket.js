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

    // en vez d emitir solo el usuario recien logueado, emito toda la room de vuelta con toda su info.
    io.to(projectId).emit(
      "userJoined",
      rooms.find((room) => room.id === projectId)
    );
  });

  socket.on("setTask", ({ projectId, task }) => {
    const room = rooms.find((r) => r.id === projectId);

    if (room) {
      room.task = task;
      io.to(projectId).emit("newTaskSetted", room);
    }
  });

  socket.on("totalValue", ({ projectId, valueSet }) => {
    console.log("entre al value");
    const room = rooms.find((r) => {
      return r.id === projectId;
    });
    if (room) {
      room.totalValue = valueSet;
      console.log("estoy emitiendo", room);

      io.to(projectId).emit("totalValueSent", room);
    }
  });

  socket.on("changeUserValue", ({ value, projectId, user }) => {
    console.log("value recibida en el backend: ", value);

    const room = rooms.find((r) => r.id === projectId);
    console.log(room.users);
    room.users.find((u) => u._id === user._id).settedValue = value;

    io.to(projectId).emit("valueChanged", room);
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

/**
 * 1. modularizar methods de rooms
 * 2. tab de config -> modificar values de poker planning
 * 3. filtros (fede)
 * 4. protejer ruta (redirect si no hay estado de Redux);
 * 5. mostrar votos, calcular promedios, aceptar el promedio como SP y reiniciar votacion
 * 6. animaciones (??)
 */
