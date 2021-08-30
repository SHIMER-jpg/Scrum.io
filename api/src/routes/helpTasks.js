import { Router } from 'express';
const helpTasks = Router();

//hardcoded TODOS
import PROJECTS from './hardcodingDataBD.js';

helpTasks.get('/:ProjectId', async (req, res, next) => {
	try{
		const { ProjectId } = req.params;

		// busco el proyecto que coincida con la id pasada
		const project = PROJECTS.find(pro => pro.id === ProjectId);

		// filtro los TODOS que necesiten ayuda y los guardo para enviar en la respuesta
		const todoHelp = project.todoList.filter(todo => !!todo.help);

		res.status(200).json(todoHelp);
	} 
	catch(error){
		next(error);
	}
});