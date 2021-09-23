const Advertisement = require("../models/Advertisement");
const UserProject = require("../models/UserProject");
const Notification = require("../models/Notification");

const mongoose = require("mongoose");

const getAllAdsByProjectId = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const mongooseId = mongoose.Types.ObjectId(projectId);
    const ads = await Advertisement.model.find({ projectId: mongooseId });

    res.status(200).json(
      ads.sort(function (a, b) {
        if (a.createdAt < b.createdAt) {
          return 1;
        }
        if (a.createdAt > b.createdAt) {
          return -1;
        }
        return 0;
      })
    );
  } catch (e) {
    next(e);
  }
};

const createAdvertisement = async (req, res, next) => {
  try {
    const { title, description, projectId, color } = req.body;

    const newAd = new Advertisement.model({
      title: title,
      description: description,
      projectId: projectId,
      color: color,
    });

    await newAd.save();

    const usersInProject = await UserProject.model.find({
      projectId: newAd.projectId,
    });

    const notifications = usersInProject
      .filter((e) => e.role === "developer")
      .map((u) => ({
        userId: u.userId,
        projectId: u.projectId,
        content: newAd.title,
        type: "ad",
      }));

    await Notification.model.insertMany(notifications);

    res.status(200).json(newAd);
  } catch (e) {
    next(e);
  }
};

const deleteAdvertisement = async (req, res, next) => {
  try {
    const advertisementId = mongoose.Types.ObjectId(req.params.advertisementId);
    await Advertisement.model.remove({ _id: advertisementId });
    res.status(200).send("success");
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllAdsByProjectId,
  createAdvertisement,
  deleteAdvertisement,
};
