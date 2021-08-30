import { Router } from "express";
import TODOS = from "hardCodingDataBD.js";

const todos = Router();

//FUNCTIONS
async function getTodosByUser(user){
  // return await Todo.findAll({
  //   where: {
  //      user: user
  //   }
  // })
  return TODOS.filter((t) => t.user === user);
}

//GET /todos
todos.get("/", async function(req, res, next){
  try{
    var {user, project} = req.body;
    var userTodos = await getTodosByUser(user);
    return res.json(userTodos);
  }
  catch(err){
    next(err);
  }
});

module.exports = router;
