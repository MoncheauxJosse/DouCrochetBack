const mongoose = require('mongoose');
require('./role.model');
const bcrypt = require('bcryptjs')

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
    },
    adresse: {
        type: Schema.Types.ObjectId,
        ref: 'Address',
    },
     orders: [{
        type: Schema.Types.ObjectId,
        ref: 'Order'
     }]
})

User.methods.matchPassword = async function (enterPassword){
    return bcrypt.compare(enterPassword, this.password);
    // return enterPassword === this.password
}

module.exports = mongoose.model('User', User);