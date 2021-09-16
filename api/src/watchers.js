const { connection } = require("./db");
const io = require("./socket");

connection.once("open", () => {
  console.log("Db connected");

  console.log("Setting watchers");

  const taskChangeStream = connection.collection("tasks").watch();

  const noteChangeStream = connection.collection("notes").watch();

  const messagesChangeStream = connection.collection("messages").watch();

  messagesChangeStream.on("change", async (change) => {
    const message = await connection.models.Message.findOne({
      _id: change?.documentKey._id,
    })
      .populate("userId")
      .exec();
    if (change.operationType === "insert") io.emit("newMessage", message);
  });

  taskChangeStream.on("change", async (change) => {
    console.log(change);
    const task = await connection.models.Task.findOne({
      _id: change?.documentKey._id,
    });

    if (change.operationType === "insert" && task.status !== "Completed") {
      // io.to(change.fullDocument.asignedTo).emit("newTaskAssigned")
      io.emit("newTaskAssigned", {
        userId: task.asignedTo,
        projectId: task.projectId,
      });

      io.emit("updateTask", {
        projectId: task.projectId,
      });
    } else if (change.operationType === "update") {
      if (
        change.updateDescription.updatedFields.asignedTo &&
        task.status !== "Completed"
      ) {
        io.emit("newTaskAssigned", {
          userId: task.asignedTo,
          projectId: task.projectId,
        });
      }

      io.emit("updateTask", {
        projectId: task.projectId,
      });
    }
  });

  noteChangeStream.on("change", (change) => {
    console.log(change);
  });
});

module.exports = { connection };
