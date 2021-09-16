const Advertisement = require("../models/Advertisement")
const mongoose = require("mongoose");

const getAllAdvsByProjectId = async (req, res, next) => {
    try{
        const {projectId} = req.params
        const mongooseId = mongoose.Types.ObjectId(projectId);
        const ads = await Advertisement.model.find({projectId: mongooseId})
        res.status(200).json(ads)
    }
    catch(e){
        next(e)
    }
}

const createAdvertisement = async (req, res, next) => {
    try{
        const {title, description, projectId} = req.body
        const newAd = new Advertisement.model({
            title: title,
            description: description,
            projectId: projectId
        })
        await newAd.save()
        res.status(200).json(newAd)
    }
    catch(e){
        next(e)
    }
}

module.exports = {
    getAllAdvsByProjectId,
    createAdvertisement,
};