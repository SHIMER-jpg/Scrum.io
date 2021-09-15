const { Router } = require("express");

const advertisement = Router();
const {
  getAllAdvsByProjectId,
  createAdvertisement
} = require("../controllers/advertisement.js");

advertisement.get('/:projectId', getAllAdvsByProjectId)
advertisement.post('/createAdvertisement', createAdvertisement)

module.exports = advertisement;