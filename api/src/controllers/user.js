const User = require("../models/User");
const UserProject = require("../models/UserProject");

const getUsersByProjectId = async (req, res, next) => {
  try {
    const { id } = req.query;
    // var data = await UserProject.model.find({ projectId: id });
    var data = await UserProject.model.aggregate([
      //TERMINAR DE VER COMO CARAJO MATCHEARLO AL PROJECT ID
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

module.exports = {
  getUsersByProjectId,
};
