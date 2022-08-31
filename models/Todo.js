const {Schema, model} = require("mongoose");

const TodoSchema = new Schema({
    date: {type: Object, required: true},
    text: {type: Array, required: true},
    createdAt: {type: Date, default: Date.now}
});

module.exports = model("Todos", TodoSchema);