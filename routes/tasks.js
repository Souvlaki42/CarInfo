const express = require("express");
const { ensureAuthenticated } = require("../config/api");
const { getTasks, postTasks, postAdd, deleteTask, toggleTask } = require("../controllers/tasks");

const router = express.Router();

router.get("/", ensureAuthenticated, getTasks);

router.post("/", ensureAuthenticated, postTasks);

router.post("/add", ensureAuthenticated, postAdd);

router.delete("/:id", deleteTask);

router.put("/:id", toggleTask);

module.exports = router;