const express = require("express");
const Todo = require("../models/Todo");
const { generateArrayRange, daysInMonth, ensureAuthenticated } = require("../config/api");

const router = express.Router();

router.get("/", ensureAuthenticated, async (req, res) => {
	const month = new Date().getMonth() + 1;
	const year = new Date().getFullYear();

	const days = generateArrayRange(1, daysInMonth(month, year));
	const months = generateArrayRange(1, 12);
	const years = generateArrayRange(0, 3000);

	res.render("todo", {days: days, months: months, years: years});
});

router.post("/search", ensureAuthenticated, (req, res) => {
	res.json({"text": req.body.todoText});
})

router.post("/add", ensureAuthenticated, async (req, res) => {
    const text = req.body.todoText;
    const day = req.body.daySelect;
    const month = req.body.monthSelect;
    const year = req.body.yearSelect;
    const user = req.user.email;
	await Todo.create({day: day, month: month, year: year, text: text, user: user});
	res.redirect("/todo");
});

router.post("/delete", async (req, res) => {
	const text = req.query.text;
	const day = req.query.day;
	const month = req.query.month;
	const year = req.query.year;
	const date = {day: day, month: month, year: year};
	await Todo.deleteOne({reference: date, text: text});
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