const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RoleShema = new Schema({
    role: {
        type: String,
        required: true,
    },
})

const Role = mongoose.model('Role', RoleShema)
module.exports = Role
