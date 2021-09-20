const { connection } = require("./db");
const io = require("./socket");
const Notification = require("./models/Notification");

connection.once("open", () => {
  console.log("Db connected");

  console.log("Setting watchers");

  const taskChangeStream = connection.collection("tasks").watch();
  const noteChangeStream = connection.collection("notes").watch();
  const notificationChangeStream = connection
    .collection("notifications")
    .watch();

  taskChangeStream.on("change", async (change) => {
    const task = await connection.models.Task.findOne({
      _id: change?.documentKey._id,
    });

    if (change.operationType === "insert" && task.status !== "Completed") {
      // io.to(change.fullDocument.asignedTo).emit("newTaskAssigned")
      await Notification.model.create({
        userId: task.asignedTo,
        projectId: task.projectId,
        type: "assignedTask",
      });

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
        await Notification.model.create({
          userId: task.asignedTo,
          projectId: task.projectId,
          type: "assignedTask",
        });

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
