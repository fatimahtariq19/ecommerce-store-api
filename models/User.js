const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phonenumber: { type: String, required: true },
    alternate_phonenumber: { type: String, default: null },
    email: { type: String, required: true, unique: true },
    alternate_email: { type: String, default: null },
    password: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
