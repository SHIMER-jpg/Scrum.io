import { Router } from "express";
import PROJECTS = from "hardCodingDataBD.js";

const todos = Router();

//FUNCTIONS
async function getTodosByUser(user, project){
  // return await Todo.findAll({
  //   where: {
  //      user: user
  //   }
  // })
  var projectFound = PROJECTS.find((p) => p.projectId === project);
  return projectFound.todoList.filter((t) => t.userId === user);
}

//GET /todos
todos.get("/", async function(req, res, next){
  try{
    var {user, project} = req.body;
    var userTodos = await getTodosByUser(user, project);
    return res.json(userTodos);
  }
  catch(err){
    next(err);
  }
});

module.exports = router;
