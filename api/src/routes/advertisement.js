const { Router } = require("express");

const advertisement = Router();
const {
  getAllAdvsByProjectId,
  createAdvertisement,
  deleteAdvertisement
} = require("../controllers/advertisement.js");

advertisement.get('/:projectId', getAllAdvsByProjectId)
advertisement.post('/createAdvertisement', createAdvertisement)
advertisement.delete('/:advertisementId', deleteAdvertisement)

module.exports = advertisement;