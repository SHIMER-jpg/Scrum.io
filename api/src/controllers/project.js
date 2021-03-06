const { transporter } = require("../nodemailer/nodemailer");
const Project = require("../models/Project");
const UserProject = require("../models/UserProject");
const Note = require("../models/Note");
const Task = require("../models/Task");

const mongoose = require("mongoose");
const User = require("../models/User");

// obtiene el proyecto por id
const getProjectById = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const project = await Project.model.findById(projectId);
    project.currentSprint = project.sprintEndDates.reduce(
      (sprint, date, index, arr) => {
        const now = new Date();
        var utcThis = Date.UTC(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          now.getHours(),
          now.getMinutes(),
          now.getSeconds(),
          now.getMilliseconds()
        );
        var utcOther = Date.UTC(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          date.getHours(),
          date.getMinutes(),
          date.getSeconds(),
          date.getMilliseconds()
        );
        if ((utcThis - utcOther) / 86400000 < 0) {
          sprint = index + 1;
          arr.splice(1);
        }
        return sprint;
      },
      -1
    );

    project.set("auxiliaryDates");
    project.save();
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

// Obtiene todos los proyectos de un usuario
const getProjectByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const mongooseId = mongoose.Types.ObjectId(userId);

    const data = await UserProject.model.aggregate([
      { $match: { userId: mongooseId } },
      {
        $lookup: {
          from: "projects",
          localField: "projectId",
          foreignField: "_id",
          as: "projects",
        },
      },
      {
        $unwind: "$projects",
      },
    ]);
    res.status(200).json(
      data.map((project) => {
        delete project.projects.taskIds;
        return project;
      })
    );
  } catch (error) {
    next(error);
  }
};

const createProject = async (req, res, next) => {
  try {
    const newProject = await new Project.model({
      projectName: req.body.projectName,
      creationDate: req.body.creationDate,
      startDate: req.body.startDate,
      requiredDate: req.body.requiredDate,
      description: req.body.description,
      sprintCount: req.body.sprintCount,
      sprintDuration: req.body.sprintDuration,
    });

    newProject.set("auxiliaryDates");
    newProject.asignUsersToNewProject(
      req.body.Users,
      req.body.scrumMaster,
      newProject._id
    );
    // await UserAndProject.save();

    await newProject.save();
    const user = await User.model.findOne({
      _id: req.body.Users,
    });

    await transporter.sendMail({
      from: '"Scrum.io" <scrumio64@gmail.com>',
      to: user.email,
      subject: "Scrumio",
      text: `<b>Greetings ${user.name}, through this email we inform you that you have been assigned a new project, please enter Scrum.io to view it.\n
      Have a nice day<b>`,
    });
    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const projectId = mongoose.Types.ObjectId(req.params.projectId);
    await Project.model.remove({ _id: projectId });
    await UserProject.model.remove({
      projectId: projectId,
    });
    const taskDocs = await Task.model.find({ projectId: projectId });
    await taskDocs.map((task) => {
      task.noteIds.map(async (note) => {
        await Note.model.remove({
          _id: mongoose.Types.ObjectId(note),
        });
      });
      task.remove();
    });
    res.status(200).json({});
  } catch (error) {
    next(errors);
  }
};

const updateStatus = async (projectId) => {
  const project = await Project.model.findOne({ _id: projectId });
  const tasks = await Task.model.find({ projectId: projectId });
  const completedSum = tasks.reduce((acc, val) => {
    var flag = val.status == "Completed" ? 1 : 0;
    return parseInt(acc) + flag;
  }, 0);
  project.status = Math.trunc((completedSum / tasks.length) * 100);
  project.isCompleted = project.status === 100 ? true : false;
  project.save();
};

const getTeamComp = async (req, res, next) => {
  try {
    const projectId = mongoose.Types.ObjectId(req.params.projectId);
    const users = await UserProject.model.aggregate([
      { $match: { projectId: projectId } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $lookup: {
          from: "userinfos",
          localField: "userId",
          foreignField: "userId",
          as: "userInfo",
        },
      },
      {
        $unwind: "$userInfo",
      },
    ]);

    res.status(200).json(
      users.map((item) => {
        return { userInfo: item.userInfo, user: item.user[0] };
      })
    );
  } catch (error) {
    next(error);
  }
};

const editProject = async (req, res, next) => {
  try {
    const id = req.body.id;
    const update = {};
    update[req.body.field] = req.body.value;
    const project = await Project.model.findOneAndUpdate({ _id: id }, update, {
      new: true,
    });
    res.status(200).json(project);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getProjectById,
  createProject,
  getProjectByUserId,
  deleteProject,
  updateStatus,
  getTeamComp,
  editProject,
};
