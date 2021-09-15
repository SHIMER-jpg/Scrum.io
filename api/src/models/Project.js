const mongoose = require("mongoose");
const { Schema } = mongoose;

const Task = require("./Task");
const UserProject = require("./UserProject");

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  creationDate: { type: Date, default: Date.now() },
  requiredDate: { type: Date }, //, required: true
  startDate: { type: Date }, //, required: true
  description: { type: String },
  sprintEndDates: [{ type: Date }],
  sprintCount: { type: Number, required: true },
  currentSprint: { type: Number },
  sprintDuration: { type: Number, required: true },
  status: { type: Number, min: 0, max: 100 },
  // tasks: [Task.schema], //quiza sacamos esto,
  taskIds: [{ type: Schema.Types.ObjectId, ref: "Task" }], //quiza sacamos esto,
});

projectSchema.methods.asignUsersToNewProject = async (
  devArray,
  scrumManager,
  projectId
) => {
  devArray
    ? await UserProject.model.insertMany(
        devArray.map((id) => {
          return {
            projectId: projectId,
            userId: id,
            role: "developer",
          };
        })
      )
    : "";

  await new UserProject.model({
    userId: scrumManager,
    projectId: projectId,
    role: "scrumMaster",
  }).save();
};

projectSchema.virtual("auxiliaryDates").set(function () {
  var date = new Date(this.startDate);
  this.set(
    "sprintEndDates",
    (sprintDates = [...Array(this.sprintCount).keys()]
      .map((value) => value * this.sprintDuration)
      .map((value) => {
        let auxDate = new Date();
        auxDate.setDate(date.getDate() + value * 7);
        return auxDate;
      }))
  );
  this.set(
    "requiredDate",
    date.setDate(date.getDate() + this.sprintCount * this.sprintDuration * 7)
  );
});

module.exports = {
  schema: projectSchema,
  model: new mongoose.model("Project", projectSchema),
};
