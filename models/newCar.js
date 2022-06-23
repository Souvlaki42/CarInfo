const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
    engineNumber: {type: Number, required: true},
    frame: {type: String, required: true},
    licensePlate: {type: String, required: true},
    date: {type: Date, required: true},
    price: {type: String, required: false},
    createdAt: {type: Date, default: Date.now},
    user: {type: String, required: true},
    bid: {type: String, unique: true, default: () => Math.floor(Math.random() * 10000000000)}
});

module.exports = mongoose.model("Cars", CarSchema);