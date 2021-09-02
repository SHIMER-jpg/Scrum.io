//objeto de ruteo
const { Router } = require('express');

// routes:
const task = require("./task");
const user = require("./user");

const router = Router();

router.use("/task", task);
router.use("/user", user);

module.exports = router;
