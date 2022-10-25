const UserModel = require('../models/user.model');
const asyncHandler = require("express-async-handler");
const generateToken = require('../security/jwt.security');

const insert =  async (req, password, role, adresseCreate, res) => {
    //création et insert de mon user dans la BDD
    const User = new UserModel({ 
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        telephone: req.body.telephone,
        password: password,
        birthdate:req.body.birthdate,
        role:role[0]._id,
        adresse:adresseCreate._id
    });
    User.save()
    res.send({
        message : 'Compte créé, veuillez vous connecter'})
    }

const findAll = async ()  => {
 return await User.find().populate("role");
}

module.exports = {findAll, insert};
