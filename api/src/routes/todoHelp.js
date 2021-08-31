const { Router } = require('express');
const todoHelp = Router();

//hardcoded TODOS
const { PROJECTS } = require('./hardcodingDataBD.js');

todoHelp.get('/:ProjectId', async (req, res, next) => {
	try{
		const { ProjectId } = req.params;

		// busco el proyecto que coincida con la id pasada
		const project = PROJECTS.find(pro => pro.id === ProjectId);

		// filtro los TODOS que necesiten ayuda y los guardo para enviar en la respuesta
		const todoHelpList = project.todoList.filter(todo => !!todo.help);

		res.status(200).json(todoHelpList);
	}
	catch(error){
		next(error);
	}
});

module.exports = todoHelp;
