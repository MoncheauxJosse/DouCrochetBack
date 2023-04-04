const mongoose = require('mongoose');

const Schema = mongoose.Schema;

 const Tva = new Schema({
    name: {
        type: String,
        required: true
    },
    tva_rate: {
        type: Schema.Types.Decimal128,
    }
})
module.exports = mongoose.model('Tva', Tva)