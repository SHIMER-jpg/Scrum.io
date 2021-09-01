//objeto de ruteo
const { Router } = require('express');

// routes:
const todoHelp = require('./todoHelp');
const todos = require('./todos');

const router = Router();

router.use("/task", task);

module.exports = router;
