const mongoose = require('mongoose');
require('./role.model');
const bcrypt = require('bcryptjs')

 const UserModel = new mongoose.Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role',
        required: true
    },
    adresse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
    },
     orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
     }]
}, 
// {
//     disabled: false
// }
)

UserModel.methods.matchPassword = async function (enterPassword){
    return await bcrypt.compare(enterPassword, this.password);
}
// UserModel.methods.toto = function(){
//     console.log(this.firstname)
// }

module.exports = mongoose.model('User', UserModel);