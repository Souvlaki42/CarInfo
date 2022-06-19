const mongoose = require("mongoose");

const UserAuthSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    date: {type: Date, default: Date.now},
    token: {type: String, required: true},
    verified: {type: Boolean, default: true}
});

module.exports = mongoose.model("User", UserAuthSchema);