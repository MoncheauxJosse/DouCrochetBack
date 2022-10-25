const User = require('../models/user.model')
const Role = require('../controllers/role.controller');
const asyncHandler = require('express-async-handler');

const findAll = async ()  => {
 return await User.find().populate("role");
}

//Vérifier l'email et le mot de passe de l'utilisateur

// Anonymiser un utilisateur
const deleteUser = () => {
    var newvalues = {
        $set: {firstname: "xxxxx", lastname: "xxxxxx"}
    }
}

module.exports = {findAll};
