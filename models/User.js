import { Schema, model } from "mongoose";
import { generateCrypto } from "../config/api.js";

export default model("User", new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: Number, required: true},
    token: {type: String, default: generateCrypto(64)},
    verified: {type: Boolean, default: false}
}));