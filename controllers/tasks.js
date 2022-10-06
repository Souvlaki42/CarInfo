const Tasks = require("../models/Task");
const { Translator } = require("../config/api");

async function getTasks(req, res) {
    const tasks = await (await Tasks.find().sort({ creation: "desc" }));
    res.render("tasks", {tasks: tasks});
}

async function postTasks(req, res) {
	const date = req.body.date.split("-");
	const day = parseInt(date[2][0] === "0" ? date[2][1] : date[2]);
	const month = parseInt(date[1]);
	const year = parseInt(date[0]);

    const tasks = await (await Tasks.find().sort({ creation: "desc" })).filter(task => task.day === day && task.month === month && task.year === year);
    res.render("tasks", {tasks: tasks});
}

async function postAdd(req, res) {
	const errors = [];

    const text = req.body.text;

	if (!text) {
		errors.push({ msg: Translator.translate("Please fill the task") });
	}
	
	if (errors.length > 0) {
		const tasks = await (await Tasks.find().sort({ creation: "desc" }));
		res.render("tasks", { tasks: tasks, errors: errors });
		return;
	}

	const date = req.body.date.split("-");
	const day = parseInt(date[2][0] === "0" ? date[2][1] : date[2]);
	const month = parseInt(date[1]);
	const year = parseInt(date[0]);
    const user = req.user.email;
	await Tasks.create({day: day, month: month, year: year, text: text, creator: user});
	res.redirect("/tasks");
}

async function deleteTask(req, res) {
    const id = req.params.id;
	await Tasks.deleteOne({uuid: id});
	res.redirect("/tasks");
}

async function toggleTask(req, res) {
    const id = req.params.id;
    let task = await Tasks.findOne({uuid: id});
	task.completed = !task.completed;
	task.save();
	res.redirect("/tasks");
}

module.exports = {getTasks, postTasks, postAdd, deleteTask, toggleTask};