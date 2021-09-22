const { connection } = require("./db");
const io = require("./socket");
const Notification = require("./models/Notification");

connection.once("open", () => {
  console.log("Db connected");

  console.log("Setting watchers");

  const taskChangeStream = connection.collection("tasks").watch();
  const adsChangeStream = connection.collection("advertisements").watch();
  const noteChangeStream = connection.collection("notes").watch();
  const notificationChangeStream = connection
    .collection("notifications")
    .watch();

  const messagesChangeStream = connection.collection("messages").watch();

  notificationChangeStream.on("change", async (change) => {
    console.log("NOTIFICATION CHANGE: ", change);

    // if (change.operationType === "insert") {
    //   const notification = await connection.models.Notification.findOne({
    //     _id: change?.documentKey._id,
    //   });

    //   io.emit("updateNotifications", { userId: notification.userId });
    // }
  });

  messagesChangeStream.on("change", async (change) => {
    const message = await connection.models.Message.findOne({
      _id: change?.documentKey._id,
    })
      .populate("userId")
      .exec();
    if (change.operationType === "insert") io.emit("newMessage", message);
  });

  taskChangeStream.on("change", async (change) => {
    const task = await connection.models.Task.findOne({
      _id: change?.documentKey._id,
    });

    if (change.operationType === "insert" && task.status !== "Completed") {
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

  adsChangeStream.on("change", async (change) => {
    const ad = await connection.models.Advertisement.findOne({
      _id: change?.documentKey._id,
    });

    if (change.operationType === "insert") {
      const usersInProject = await connection.models.UserProjects.find({
        projectId: ad.projectId,
      });

      // la voy a emitir a todos los usuarios del proyecto ~MENOS~ el Scrum master
      const usersToEmit = usersInProject
        .filter((e) => e.role === "developer")
        .map((e) => e.userId);

      io.emit("newAd", {
        projectId: ad.projectId,
        users: usersToEmit,
      });
    }
  });

  noteChangeStream.on("change", (change) => {
    console.log(change);
  });
});

module.exports = { connection };
