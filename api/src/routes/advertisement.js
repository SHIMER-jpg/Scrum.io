const { Router } = require("express");

const advertisement = Router();
const {
  getAllAdsByProjectId,
  createAdvertisement,
  deleteAdvertisement,
} = require("../controllers/advertisement.js");

advertisement.get("/:projectId", getAllAdsByProjectId);
advertisement.post("/createAdvertisement", createAdvertisement);
advertisement.delete("/:advertisementId", deleteAdvertisement);

module.exports = advertisement;
