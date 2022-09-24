const {Schema, model} = require("mongoose");

const CarSchema = new Schema({
    engineNumber: {type: String, required: true},
    frame: {type: String, required: true},
    licensePlate: {type: String, required: true},
    date: {type: String, required: true},
    price: {type: String, required: false},
    createdAt: {type: Date, default: Date.now},
    creator: {type: String, required: true},
    bid: {type: String, unique: true, default: () => Math.floor(Math.random() * 10000000000)}
});

module.exports = model("Cars", CarSchema);