const {Schema, model} = require("mongoose");

const TodoSchema = new Schema({
    reference: {type: Object, required: true},
    text: {type: String, required: true},
    completed: {type: Boolean, default: false},
    creation: {type: Date, default: Date.now}
});

module.exports = model("Todos", TodoSchema);