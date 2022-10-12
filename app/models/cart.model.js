const mongoose = require('mongoose');
require('./address.model');
require('./user.model');
require('./productline.model');

const Schema = mongoose.Schema;

const Cart = new Schema({
    order_date: {
        type: Date,
        required: true
    },
    order_state: {
        type: String,
        required: true
    },
    order_bill: {
        type: Date,
        required: true
    },
    order_delivery: {
        type: Date,
        required: true
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: 'Address'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    productLine: [{
        type: Schema.Types.ObjectId,
        ref: 'ProductLine'
    }]
})

module.exports = mongoose.model('Cart', Cart)