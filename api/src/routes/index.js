//objeto de ruteo
const { Router } = require('express');

// routes:
const todoHelp = require('./todoHelp');
const todos = require('./todos');

const router = Router();

router.use('/todoHelp', todoHelp);
router.use('/todos', todos);

module.exports = router;
