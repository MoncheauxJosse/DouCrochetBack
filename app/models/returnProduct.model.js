const mongoose = require('mongoose');

const Schema = mongoose.Schema;

 const returnProduct = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    etat: {
        type: Boolean,
        default: false
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    }
})
module.exports = mongoose.model('return-Product', returnProduct)