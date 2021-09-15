const Advertisement = require("../models/Advertisement")

const getAllAdvsByProjectId = async (req, res, next) => {
    try{
        const {projectId} = req.params
        const ads = Advertisement.model.find({})
        res.status(200).json(ads)
    }
    catch(e){
        next(e)
    }
}

const createAdvertisement = async (req, res, next) => {
    try{
        const {title, date, description} = req.body
        const newAdvertisement = new Advertisement.model({
            title: title,
            date: date,
            description: description
        })
        await newAdvertisement.save()
        res.send(200).json('advertisement succefully created')
    }
    catch(e){
        next(e)
    }
}

module.exports = {
    getAllAdvsByProjectId,
    createAdvertisement
};