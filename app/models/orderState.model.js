const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderState = new Schema({
    state: {
        type: String,
    },
})

module.exports = mongoose.model('OrderState', OrderState)
