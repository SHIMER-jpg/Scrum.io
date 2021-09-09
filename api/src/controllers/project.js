const { transporter } = require("../nodemailer/nodemailer");
const Project = require("../models/Project");
const UserProject = require("../models/UserProject");
const mongoose = require("mongoose");
const User = require ("../models/User")

// obtiene el proyecto por id
const getProjectById = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const project = await Project.model.findById(projectId);
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
    const newProject = new Project.model({
      projectName: req.body.projectName,
      creationDate: req.body.creationDate,
      requiredDate: req.body.requiredDate,
      description: req.body.description,
      sprintCount: req.body.sprintCount,
      currentSprint: req.body.currentSprint,
      sprintDuration: req.body.sprintDuration,
    });

    newProject.asignUsersToNewProject(
      req.body.Users,
      req.body.scrumMaster,
      newProject._id
    );
    // await UserAndProject.save();


    await newProject.save();
    const user = await User.model.findOne({
      _id: req.body.Users
    })
    
    await transporter.sendMail({
      from: '"Scrum.io" <scrumio64@gmail.com>',
      to: user.email, 
      subject: "Scrumio", 
      text: `<b>Greetings ${user.name}, through this email we inform you that you have been assigned a new project, please enter Scrum.io to view it.\n
      Have a nice day<b>` 
    });

    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjectById,
  createProject,
  getProjectByUserId,
};
