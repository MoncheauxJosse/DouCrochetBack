const mongoose = require('mongoose');

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
        type: Date,
    },
    image: {
        type: String,
    },
    quantity: {
        type: Number,
    },
})
module.exports = mongoose.model('Product', ProductSchema)