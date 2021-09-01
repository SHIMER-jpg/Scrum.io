const { Router } = require('express');
const { getProjectById } = require('../controllers/projects.js');
const todoHelp = Router();

// Get project by id.
todoHelp.get('/:projectId', getProjectById);

module.exports = todoHelp;
