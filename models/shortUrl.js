const mongoose = require("mongoose");
const shortId = require("shortid");

const ShortUrlSchema = new mongoose.Schema({
    long: {type: String, required: true},
    short: {type: String, unique: true, default: shortId.generate},
    clicks: {type: Number, required: true, default: 0},
    email: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model("ShortUrl", ShortUrlSchema);