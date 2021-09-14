const io = require("../socket");

// let rooms = [{id: 121sao92193jdf, users: [{}, {}, {}], card: {}, totalValue: 0, buttonsEnabled: false}];
let rooms = [];

io.on("connection", (socket) => {
  socket.on("createRoom", ({ projectId, user }) => {
    socket.join(projectId);
    const room = rooms.find((r) => r.id === projectId);

    if (!room) {
      rooms.push({
        id: projectId,
        users: [user],
        task: null,
        minValue: null,
        maxValue: null,
        isRoomInitialized: true,
      });

      console.log("CREATING ROOM");

      io.to(projectId).emit("roomInitialized");
    }
  });

  socket.on("joinPokerPlanningRoom", ({ projectId, user }) => {
    socket.join(projectId);

    const room = rooms.find((r) => r.id === projectId);

    // To do: si un usuario ya existe en otra room, borrarlo e insertarlo en la nueva.
    if(room) {
      if (!room.users.find((u) => u._id === user._id)) {
        room.users.push(user);
      }
  
      // en vez d emitir solo el usuario recien logueado, emito toda la room de vuelta con toda su info.
      io.to(projectId).emit("updateRoom", room);
      io.to(projectId).emit("roomInitialized");
    } else {
      io.to(projectId).emit("roomUninitialized");
    }
  });

  socket.on("setTask", ({ projectId, task }) => {
    const room = rooms.find((r) => r.id === projectId);

    if (room) {
      room.task = task;
      io.to(projectId).emit("updateRoom", room);
    }
  });

  socket.on("changeButtonsState", ({ projectId, value }) => {
    const room = rooms.find((r) => r.id === projectId);

    if (room) {
      room.buttonsEnabled = value;

      io.to(projectId).emit("updateRoom", room);
    }
  });

  socket.on("totalValue", ({ projectId, valueSet }) => {
    const room = rooms.find((r) => {
      return r.id === projectId;
    });

    if (room) {
      if (isNaN(valueSet)) valueSet = "0";
      const maxValue = Math.max(
        ...room.users
          .filter((u) => u.userRole === "developer")
          .map((u) => u.settedValue)
      );
      const minValue = Math.min(
        ...room.users
          .filter((u) => u.userRole === "developer")
          .map((u) => u.settedValue)
      );

      if(valueSet.toString().includes(".")) {
        valueSet = Number(valueSet).toFixed(1);
      }

      room.totalValue = valueSet;
      room.minValue = minValue;
      room.maxValue = maxValue;

      io.to(projectId).emit("totalValueSent", room);
    }
  });

  socket.on("changeUserValue", ({ value, projectId, user }) => {
    const room = rooms.find((r) => r.id === projectId);
    room.users.find((u) => u._id === user._id).settedValue = value;

    io.to(projectId).emit("updateRoom", room);
  });

  socket.on("taskUpdatedSuccess", ({ projectId }) => {
    const room = rooms.find((r) => r.id === projectId);

    if (room) {
      room.task = null;
      room.buttonsEnabled = false;
      room.task = null;
      room.totalValue = null;
      room.minValue = null;
      room.maxValue = null;

      room.users.forEach((u) => (u.settedValue = null));

      io.to(projectId).emit("resetGame", room);
    }
  });

  socket.on("disconnectUser", ({ projectId, user }) => {
    const room = rooms.find((r) => r.id === projectId);

    if (room) {
      room.users = room.users.filter((u) => u._id !== user._id);
      io.to(projectId).emit("updateRoom", room);
    }
  });

  socket.on("closeRoom", ({ projectId }) => {
    // borro la room
    rooms = rooms.filter((r) => r.id !== projectId);

    io.to(projectId).emit("roomClosed");
  });
});
