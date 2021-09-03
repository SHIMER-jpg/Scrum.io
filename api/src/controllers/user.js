const User = require("../models/User");
const UserProject = require("../models/UserProject");
const mongoose = require("mongoose");

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
      const newUser = await User.model.create(...req.body);
      res.status(201).json(newUser);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsersByProjectId,
  findOrCreateUser,
};
