const {Schema, model} = require("mongoose");
const { v4:uuid } = require("uuid");

const TaskSchema = new Schema({
    day: {type: Number, required: true},
    month: {type: Number, required: true},
    year: {type: Number, required: true},
    text: {type: String, required: true},
    creator: {type: String, required: true},
    completed: {type: Boolean, default: false},
    creation: {type: Date, default: Date.now},
    uuid: {type: String, unique: true, default: uuid}
});

module.exports = model("Tasks", TaskSchema);