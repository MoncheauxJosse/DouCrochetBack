const User = require('../models/user.model');
const asyncHandler = require("express-async-handler");
const generateToken = require('../config/generateToken');


//On récupère les utilisateurs
const findUser = (req, res) => {
    User.find()
        .then((user) => {
            res.status(200).send(user);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving users.',
            });
        });
}

//On vérifie si le mail et le mdp sont les mêmes dans la bdd
const checkUser = asyncHandler(async (req, res) => {
        const {email, password} = req.body
        const user = await User.findOne({email});
        if(user && await user.matchPassword(password)){
            res.json({
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                token: generateToken(user._id)
            })
            
        }else{
            res.status(401)
            throw new Error("Invalid Email or Password")
        }
    })

const profileUser = asyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id)
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

module.exports = {findUser, checkUser, profileUser}