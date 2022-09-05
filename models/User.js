const {Schema, model} = require("mongoose");
const {generateCrypto} = require("../config/api");

const UserAuthSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: Number, required: true},
    token: {type: String, default: generateCrypto(64)},
    verified: {type: Boolean, default: false}
});

module.exports = model("User", UserAuthSchema);