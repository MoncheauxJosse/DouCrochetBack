const mongoose = require('mongoose');
require('./tva.model')

const Schema = mongoose.Schema;

 const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creation_date: {
        type: Date.now(),
    },
    image: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    tva: [{
        type: Schema.Types.ObjectId,
        ref: 'Tva'
    }],
    category: [{
        type: Schema.Types.ObjectId,
        ref: 'ProductCategory'
    }]
})
module.exports = mongoose.model('Product', ProductSchema)