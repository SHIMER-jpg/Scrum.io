const { connection } = require("./db");

connection.once("open", () => {
  console.log("Db connected");

  console.log("Setting watchers");
  const taskChangeStream = connection.collection("tasks").watch();

  const noteChangeStream = connection.collection("notes").watch();

  // io.of("/api/socket").on("connection", (socket) => {
  //   console.log("socket.io: User connected: ", socket.id);

  //   socket.on("disconnect", () => {
  //     console.log("socket.io: User disconnected: ", socket.id);
  //   });
  // });

  taskChangeStream.on("change", (change) => {
    // io.of("/").emit("taskChange", change);
    console.log(change);
  });

  noteChangeStream.on("change", (change) => {
    console.log(change);
  });
});

module.exports = { connection };
