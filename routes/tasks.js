const express = require("express");
const Tasks = require("../models/Task");
const { ensureAuthenticated, getCalendarItems } = require("../config/api");

const router = express.Router();

async function findTasksAndRender(res, day, month, year) {
    if (!day || !month || !year) return;
    const tasks =  await Tasks.find({day: day, month: month, year: year});
    const calendarItems = getCalendarItems(month, year);
    res.render("tasks", {days: calendarItems.days, years: calendarItems.years, tasks: tasks});
}

router.get("/", ensureAuthenticated, (req, res) => {
    const day = new Date().getDate();
	const month = new Date().getMonth() + 1;
	const year = new Date().getFullYear();

    findTasksAndRender(res, day, month, year);
});

router.post("/", ensureAuthenticated, async (req, res) => {
	const day = req.query.day;
	const month = req.query.month;
	const year = req.query.year;

    findTasksAndRender(res, day, month, year);
});

router.post("/add", ensureAuthenticated, async (req, res) => {
    const text = req.body.text;
    const day = req.body.days;
    const month = req.body.months;
    const year = req.body.years;
    const user = req.user.email;
	await Tasks.create({day: day, month: month, year: year, text: text, user: user});
	res.redirect("/tasks");
});

router.post("/delete", async (req, res) => {
	const text = req.query.text;
	const day = req.query.day;
	const month = req.query.month;
	const year = req.query.year;
	await Todo.deleteOne({day: day, month: month, year: year, text: text});
	res.json({"msg": "success"});
});

router.post("/toggleComplete", async (req, res) => {
	const text = req.query.text;
	const day = req.query.day;
	const month = req.query.month;
	const year = req.query.year;
	const date = {day: day, month: month, year: year};
	let todo = await Todo.findOne({reference: date, text: text});
	if (!todo) return;
	todo.completed = !todo.completed;
	todo.save();
	res.json({"msg": "success"});
});

module.exports = router;