const mongoose = require('mongoose');
require('./addresscategory.model');

const Schema = mongoose.Schema;

const Address = new Schema({
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    cityCode: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Address', Address)