const express = require("express");
const { Translator } = require("../config/utils");
const Todo = require("../models/Todo");

const router = express.Router();

router.get("/", async (req, res) => {
    const day = req.query.day || new Date().getDate().toString();
    const month = req.query.month || (new Date().getMonth() + 1).toString();
    const year = req.query.year || new Date().getFullYear().toString();
    const date = {day: day, month: month, year: year};
    const todos = await (Todo.find({reference: date}));
    const stringTodos = JSON.stringify(todos);
    res.render("todo", { layout: "todo", Translator: Translator, todos: stringTodos });
});

router.post("/add", async (req, res) => {
    const text = req.query.text;
    const day = req.query.day;
    const month = req.query.month;
    const year = req.query.year;
    const date = {day: day, month: month, year: year};
    await Todo.create({reference: date, text: text});
    res.redirect("/");
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