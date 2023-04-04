const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Complaint = new Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'UserModel'
    }
})

module.exports = mongoose.model('Complaint', Complaint)