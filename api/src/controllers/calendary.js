const mongoose = require("mongoose");
const Event = require("../models/calendary")

const { Router } = require("express");


// function createEvent(req, res, next) {
//   const event = Event(req.body)

//   await event.save()
//   res.status(200)
// }


  const createEvent = (async(req, res, next) => {
    try{
      const event = new Event(req.body)
      await event.save()
      res.status(201).json(event)
    }
    catch(error){
      next(error)
    }
  })


const getEvent = (async(req, res, next) => {
  try{
    const event = await Event.find({
      start: moment(req.body.start).toDate(), end: moment(req.body.end).toDate()
    })
    res.status(200).json(event)
  }
  catch(error){
    next(error)
  }
})


module.exports = {
    getEvent,
    createEvent
  };