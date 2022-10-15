import express from "express";
import { ensureAuthenticated } from "../config/api.js";
import { getTasks, postTasks, postAdd, deleteTask, toggleTask } from "../controllers/tasks.js";

const router = express.Router();

router.get("/", ensureAuthenticated, getTasks);

router.post("/", ensureAuthenticated, postTasks);

router.post("/add", ensureAuthenticated, postAdd);

router.delete("/:id", deleteTask);

router.put("/:id", toggleTask);

export default router;