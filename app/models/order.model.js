const mongoose = require('mongoose');
require('./address.model');
require('./user.model');
require('./productline.model');
require('./orderState.model');

const Schema = mongoose.Schema;

const Order = new Schema({
    order_date: {
        type: Date,
        default: Date.now,
        required: true
    },
    order_state: {
        type: Schema.Types.ObjectId,
        ref: 'OrderState'
    },
    order_bill: {
        type: Date,
        required: true
    },
    order_delivery: {
        type: Date
    },
    addresse: {
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

module.exports = mongoose.model('Order', Order)