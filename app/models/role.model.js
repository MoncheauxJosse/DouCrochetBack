const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Role = new Schema({
    role: {
        type: String,
        required: true,
    }, 
    _id: Number,
})

module.exports = mongoose.model('role', Role)