const express = require("express");
const { Translator } = require("../config/utils");
const Todo = require("../models/Todo");

const router = express.Router();

router.get("/", async (req, res) => {
    const day = req.query.day || new Date().getDate().toString();
    const month = req.query.month || (new Date().getMonth() + 1).toString();
    const year = req.query.year || new Date().getFullYear().toString();
    const date = {day: day, month: month, year: year};
    const todos = await Todo.findOne({date: date});
    const stringTodos = JSON.stringify(todos.text);
    res.render("todo", { layout: "todo", Translator: Translator, todos: stringTodos });
});

router.post("/add", async (req, res) => {
    const item = req.query.item;
    const day = req.query.day;
    const month = req.query.month;
    const year = req.query.year;
    const date = {day: day, month: month, year: year};
    const todo = await Todo.findOne({date: date});
    if (todo) {
        todo.text.push(item);
        todo.save();
    } else {
        Todo.create({date: date, text: [item]});
    }

    res.redirect("/");
});

module.exports = router;