const UserModel = require('../models/user.model');
const roleService = require('./role.service')
const adresseservice = require('./adresse.service')
const asyncHandler = require("express-async-handler");
const generateToken = require('../security/jwt.security');
const bcrypt = require('bcryptjs');

const checkPass = (req, res) => {
    if(req.body.password===req.body.confirmpassword){  
        return bcrypt.hashSync(req.body.password, 10);
    }
    else{
        res.send({
            message : "mot de passe incorrect"
        })
    }
}

const insert =  async (req, res) => {
    const password = checkPass(req);
    const role = await roleService.findOneRole('client');
    const adresse = await adresseservice.insert(req, res)
    const session = {password, role, adresse}
    if(session){
        const User = new UserModel({ 
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                telephone: req.body.telephone,
                password: password,
                birthdate:req.body.birthdate,
                role:role._id,
                adresse:adresse._id
        });
        await User.save()
    return User.email
    }
}

const findAll = async ()  => {
 return await User.find().populate("role");
}
const matchPassword = async function (enterPassword, userpassword){
    return await bcrypt.compare(enterPassword, userpassword);
}

module.exports = {findAll, insert, matchPassword, checkPass}
