const mongoose = require('mongoose');

const Schema = mongoose.Schema
const User = new Schema({
    name: { type: String },
    username: { type: String },
    passport: { type: String },
    phone: { type: String },
    order: { type: String },
    adminToken: { type: Boolean, default: false },
    password: { type: String }
})

module.exports = mongoose.model('User', User, "users")