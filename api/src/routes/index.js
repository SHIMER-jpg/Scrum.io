//objeto de ruteo
const { Router } = require("express");

// routes:
const task = require("./task");
const user = require("./user");
const project = require("./project");
const note = require("./note");
const message = require("./message");

const router = Router();

router.use("/project", project);
router.use("/task", task);
router.use("/user", user);
router.use("/note", note);
router.use("/message", message);

module.exports = router;
