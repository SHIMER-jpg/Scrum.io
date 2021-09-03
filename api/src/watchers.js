const { connection } = require("./db");
const io = require("./socket");

connection.once("open", () => {
  console.log("Db connected");

  console.log("Setting watchers");

  const taskChangeStream = connection.collection("tasks").watch();

  const noteChangeStream = connection.collection("notes").watch();

  taskChangeStream.on("change", (change) => {
    io.emit("taskChange", change);
    console.log(change);
  });

  noteChangeStream.on("change", (change) => {
    console.log(change);
  });
});

module.exports = { connection };
