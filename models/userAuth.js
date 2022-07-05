const mongoose = require("mongoose");
const crypto = require("crypto");

const UserAuthSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: Number, required: true},
    token: {type: String, unique: true, default: crypto.randomBytes(64).toString("hex")},
    verified: {type: Boolean, default: false}
});

module.exports = mongoose.model("User", UserAuthSchema);