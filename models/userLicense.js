const mongoose = require("mongoose");
const crypto = require("crypto");

const UserLicenseSchema = new mongoose.Schema({
    user: {type: String, unique: true, required: true},
    key: {type: String, unique: true, default: crypto.randomBytes(64).toString("hex")}
});

module.exports = mongoose.model("Licenses", UserLicenseSchema);