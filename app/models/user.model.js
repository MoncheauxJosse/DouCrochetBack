const mongoose = require('mongoose');
require('./telephone.model');
require('./roleuser.model');

const Schema = mongoose.Schema;

 const User = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    telephone: [
        {
            type: String,
            required: true,
        },
    ],
    password: {
        type: String,
        required: true,
    },
    birthdate: {
        type: Date,
        required: true,
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'role',
        required: true
    }
})


module.exports = mongoose.model('User', User);