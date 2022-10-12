const mongoose = require('mongoose');
require('./cart.model')
require('./product.model')

const Schema = mongoose.Schema;

const Order = new Schema({
    price_ht: {
        type: Schema.Types.Decimal128
    },
    tva: {
        type: Schema.Types.Decimal128
    },
    quantity: {
        type: Number
    },
    cart: [{
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    }],
    product: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
})

module.exports = mongoose.model('Order', Order)