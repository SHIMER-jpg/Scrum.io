const io = require("../socket");

// let rooms = [{id: 121sao92193jdf, users: [{}, {}, {}], card: {}, totalValue: 0, buttonsEnabled: false}];
let rooms = [];

io.on("connection", (socket) => {
  socket.on("createRoom", ({ projectId, user }) => {
    socket.join(projectId);
  });

  socket.on("joinPokerPlanningRoom", ({ projectId, user }) => {
    socket.join(projectId);

    // To do: si un usuario ya existe en otra room, borrarlo e insertarlo en la nueva.

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

  socket.on("changeButtonsState", ({ projectId, value }) => {
    const room = rooms.find((r) => r.id === projectId);

    if (room) {
      room.buttonsEnabled = value;

      io.to(projectId).emit("buttonsStateChanged", room);
    }
  });

  socket.on("totalValue", ({ projectId, valueSet }) => {
    const room = rooms.find((r) => {
      return r.id === projectId;
    });

    if (room) {
      if (isNaN(valueSet)) valueSet = "0";

      room.totalValue = valueSet;

      io.to(projectId).emit("totalValueSent", room);
    }
  });

  socket.on("changeUserValue", ({ value, projectId, user }) => {
    const room = rooms.find((r) => r.id === projectId);
    room.users.find((u) => u._id === user._id).settedValue = value;

    io.to(projectId).emit("valueChanged", room);
  });

  socket.on("taskUpdatedSuccess", ({ projectId }) => {
    const room = rooms.find((r) => r.id === projectId);

    if (room) {
      room.task = null;
      room.buttonsEnabled = false;
      room.task = null;
      room.totalValue = null;

      room.users.forEach((u) => (u.settedValue = null));

      io.to(projectId).emit("resetGame", room);
    }
  });

  socket.on("disconnectUser", ({ projectId, user }) => {
    const room = rooms.find((r) => r.id === projectId);

    if (room) {
      room.users = room.users.filter((u) => u._id !== user._id);
      io.to(projectId).emit("userDisconnected", room);
    }
  });

  socket.on("closeRoom", ({ projectId }) => {
    // borro la room
    rooms = rooms.filter((r) => r.id !== projectId);

    io.to(projectId).emit("roomClosed");
  });
});
