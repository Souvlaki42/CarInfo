import { Schema, model } from "mongoose";
import { v4 as uuid } from "uuid";

export default model("Cars", new Schema({
    engineNumber: {type: String, required: true},
    frame: {type: String, required: true},
    licensePlate: {type: String, required: true},
    date: {type: String, required: true},
    price: {type: String, required: false},
    creator: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    uuid: {type: String, unique: true, default: uuid}
}));