const mongoose = require('mongoose');
require('./product.model');
require('./productcategory.model');

const Schema = mongoose.Schema;

 const Belong = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'ProductCategory',
    }
})
module.exports = mongoose.model('Belong', Belong)