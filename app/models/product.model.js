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
        min: 0.01,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String
       
    },
    quantity: {
        type: Number,
        min: 1,
        required: true
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