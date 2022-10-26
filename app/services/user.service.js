const User = require('../models/user.model')
const Role = require('../controllers/role.controller');
const asyncHandler = require('express-async-handler');
const generateToken = require('../security/jwt.security');

const findAll = async ()  => {
 return await User.find().populate("role");
}

//Vérifier l'email et le mot de passe de l'utilisateur
const checkUser = asyncHandler(async(req, res)=>{
    const {email, password} = req.body
    const user = await User.findOne({email}).populate('role');
    if(user && await user.matchPassword(password)){
    res.json({
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        token: generateToken(user.email, user.role.role)
    })
    }else{
        res.status(401)
    }
})

const profileUser = asyncHandler(async(req, res) => {
    const user = await userModel.findById(req.user._id)
        if(user){
        res.json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
        })
        }else{
            res.status(404);
            throw new Error("Utilisateur non trouvé");
        }
})

// Anonymiser un utilisateur
const deleteUser = () => {
    var newvalues = {
        $set: {firstname: "xxxxx", lastname: "xxxxxx"}
    }
}

module.exports = {findAll, checkUser, profileUser};
