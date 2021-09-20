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
        const {title, description, projectId, color} = req.body
        const newAd = new Advertisement.model({
            title: title,
            description: description,
            projectId: projectId,
            color: color
        })
        await newAd.save()
        res.status(200).json(newAd)
    }
    catch(e){
        next(e)
    }
}

const deleteAdvertisement = async (req, res, next) => {
    try{
        const advertisementId = mongoose.Types.ObjectId(req.params.advertisementId);
        await Advertisement.model.remove({ _id: advertisementId });
        res.status(200).send('success')
    }
    catch(e){
        next(e)
    }
}

module.exports = {
    getAllAdvsByProjectId,
    createAdvertisement,
    deleteAdvertisement
};