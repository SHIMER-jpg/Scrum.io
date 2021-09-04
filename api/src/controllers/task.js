const Task = require("../models/Task");

const getTasksByProjectId = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const data = await Task.model.find({ projectId: projectId });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const postTask = async (req, res, next) => {
  try {
    var newTask = new Task.model({
      title: req.body.title,
      asignedTo: req.body.user,
      status: req.body.status,
      storyPoints: req.body.storyPoints,
      prorization: req.body.priorization,
      details: req.body.details,
    });
    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};


const modifyingTask= async(req, res, next) => {
  try{
    const { taskId } = req.params
    let newStatus  = req.body.status
    let newPriorization  = req.body.priorization
      if(newStatus){
        const filter = { _id: taskId };
        const update = { status: newStatus};
        await Task.model.findOneAndUpdate(filter, update);
        res.status(200).send('Successfully modified status')
      }else{
        if(newPriorization){
          const filter = { _id: taskId };
          const update = { priorization: newPriorization};
          await Task.model.findOneAndUpdate(filter, update);
          res.status(200).send('Successfully modified priorization')
        }else{
          const filter = { _id: taskId };
          const update = { helpNeeded: true};
          await Task.model.findOneAndUpdate(filter, update);
          res.status(200).send('Successfully modified helpNeeded')
        }
      }
    }catch(error){
    next(error)
  }
} 


module.exports = {
  postTask,
  getTasksByProjectId,
  modifyingTask
};
