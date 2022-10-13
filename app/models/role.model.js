const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Role = new Schema({
    role: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('role', Role)
