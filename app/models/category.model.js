const mongoose = require('mongoose');

const Schema = mongoose.Schema;

 const ProductCategory = new Schema({
    name: {
        type: String,
        required: true
    },
    product: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
})
module.exports = mongoose.model('Product-Category', ProductCategory)