const User = require("../models/User");
const UserProject = require("../models/UserProject");
const UserInfo = require("../models/UserInfo");
const mongoose = require("mongoose");
const { topLanguagesQuery, userStats } = require("../utils.js");

const getUsersByProjectId = async (req, res, next) => {
  try {
    const { id } = req.query;
    const mongooseId = mongoose.Types.ObjectId(id);
    const data = await UserProject.model.aggregate([
      { $match: { projectId: mongooseId } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
    ]);

    res.status(200).json(data);
    // delete data.res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getUserRole = async (req, res, next) => {
  try {
    const { userId, projectId } = req.query;

    const data = await UserProject.model.find({
      userId: userId,
      projectId: projectId,
    });

    res.status(200).json(data[0].role);
  } catch (error) {
    next(error);
  }
};

const findOrCreateUser = async (req, res, next) => {
  try {
    const userInDB = await User.model.findOne({
      providerId: req.body.providerId,
    });

    if (userInDB) {
      return res.status(200).json(userInDB);
    } else {
      const newUser = await User.model.create(req.body);
      res.status(201).json(newUser);
    }
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.model.find();

    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

const getUserInfo = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userInfo = await UserInfo.model.findOne({
      userId: mongoose.Types.ObjectId(userId),
    });

    res.status(200).json(userInfo);
  } catch (error) {
    next(error);
  }
};

const editUserInfo = async (req, res, next) => {
  try {
    const { userId } = req.params;

    console.log(userId)
    console.log(req.body)

    const userInfo = await UserInfo.model.findOneAndUpdate(
      {
        userId: mongoose.Types.ObjectId(userId),
      },
      { ...req.body },
      { upsert: true, new: true } // upsert true: find or Create, new: true devuelve la edicion nueva, no la vieja
    );

    res.status(200).json(userInfo);
  } catch (error) {
    next(error);
  }
};

const assignUsers = async (req, res, next) => {
  try {
    const projectId = mongoose.Types.ObjectId(req.params.projectId);
    const userId = mongoose.Types.ObjectId(req.body.userId);

    const userExists = await UserProject.model.findOne({
      projectId: projectId,
      userId: userId,
    });
    const newUser = userExists
      ? { error: "User already assigned" }
      : await UserProject.model.create({
          projectId: projectId,
          userId: userId,
          role: "developer",
        });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const projectId = mongoose.Types.ObjectId(req.params.projectId);
    const userId = mongoose.Types.ObjectId(req.body.userId);

    const deleteUser = await UserProject.model.findOneAndRemove({
      projectId: projectId,
      userId: userId,
    });
    res.status(204).json({ msg: "hola fede" });
  } catch (error) {
    next(error);
  }
};

//GIT STATS
const gitLanguageStats = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const rta = await topLanguagesQuery({ login: userId });
    const repositories = rta.data.data.user.repositories.nodes;
    const stats = repositories.reduce((acc, repo) => {
      const current = repo.languages.edges.reduce((acc, lang) => {
        acc[lang.node.name] = { color: lang.node.color, size: lang.size };
        return acc;
      }, {});
      Object.keys(current).forEach((key) => {
        if (!acc[key]) acc[key] = current[key];
        else acc[key].size += current[key].size;
      });
      return acc;
    }, {});

    res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
};

const gitUserStats = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const rta = await userStats({ login: userId });

    res.status(200).json(rta.data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsersByProjectId,
  findOrCreateUser,
  getAllUsers,
  getUserRole,
  assignUsers: assignUsers,
  deleteUser,
  getUserInfo,
  gitLanguageStats,
  gitUserStats,
  editUserInfo
};
