const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AddressCategory = new Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('AddressCategory', AddressCategory)