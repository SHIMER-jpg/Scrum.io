//objeto de ruteo
const { Router } = require("express");

// routes:
const task = require("./task");

const router = Router();

router.use("/task", task);

module.exports = router;
