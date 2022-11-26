import { Schema, model } from "mongoose";
import { v4 as uuid } from "uuid";

export default model("Tasks", new Schema({
    day: {type: Number, required: true},
    month: {type: Number, required: true},
    year: {type: Number, required: true},
    text: {type: String, required: true},
    creator: {type: String, required: true},
    completed: {type: Boolean, default: false},
    creation: {type: Date, default: Date.now},
    uuid: {type: String, unique: true, default: uuid}
}));