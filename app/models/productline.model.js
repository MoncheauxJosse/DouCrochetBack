const mongoose = require('mongoose');
require('./order.model')
require('./product.model')

const Schema = mongoose.Schema;

const ProductLine = new Schema({
    price_ht: {
        type: Schema.Types.Decimal128
    },
    tva: {
        type: Schema.Types.Decimal128
    },
    quantity: {
        type: Number
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
})

module.exports = mongoose.model('ProductLine', ProductLine)