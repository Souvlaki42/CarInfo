const {Schema, model} = require("mongoose");

const TodoSchema = new Schema({
    day: {type: Number, required: true},
    month: {type: Number, required: true},
    year: {type: Number, required: true},
    text: {type: String, required: true},
    user: {type: String, required: true},
    completed: {type: Boolean, default: false},
    creation: {type: Date, default: Date.now}
});

module.exports = model("Todos", TodoSchema);