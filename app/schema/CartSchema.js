const mongoose = require('mongoose');

const Schema = mongoose.Schema
const Cart = new Schema({
    host: { type: String },
    from: { type: String },
    to: { type: String },
    starting_time: { type: Date },
    
})

module.exports = mongoose.model('Card', Card, "cards")