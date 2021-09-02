//objeto de ruteo
const { Router } = require('express');

// routes:
const task = require("./task");
const user = require("./user");
const project = require("./project");

const router = Router();

router.use("/project", project);
router.use("/task", task);
router.use("/user", user);

module.exports = router;
