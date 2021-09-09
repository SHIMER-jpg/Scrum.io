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

// let rooms = [{id: 121sao92193jdf, users: [{}, {}, {}], card: {}, totalValue: 0, buttonsEnabled: false}];
let rooms = [];

io.on("connection", (socket) => {
  console.log("socket.io: User connected: ", socket.id);

  socket.on("disconnect", () => {
    console.log("socket.io: User disconnected: ", socket.id);
  });

  socket.on("createRoom", ({ projectId, user }) => {
    socket.join(projectId);
  });
});

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
