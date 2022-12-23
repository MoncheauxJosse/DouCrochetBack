const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderState = new Schema({
    state: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('OrderState', OrderState)
