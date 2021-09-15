//objeto de ruteo
const { Router } = require("express");

// routes:
const task = require("./task");
const user = require("./user");
const project = require("./project");
const note = require("./note");
const advertisement = require("./advertisement");

const router = Router();

router.use("/project", project);
router.use("/task", task);
router.use("/user", user);
router.use("/note", note);
router.use("/advertisement", advertisement);

module.exports = router;
