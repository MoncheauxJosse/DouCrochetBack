const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Telephone = new Schema({
    number: {
        type: String
    }
})

module.exports = mongoose.model('telephone', Telephone)