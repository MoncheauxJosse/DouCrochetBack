
const UserModel = require('../models/user.model');
const roleController = require('../controllers/role.controller')
const bcrypt = require('bcryptjs')
const adresseController = require('../controllers/adresse.controller')
const asyncHandler = require("express-async-handler");
const userService = require('../services/user.service');
const generateToken = require('../security/jwt.security');
const jwtSecurity = require('../security/jwt.security');

const insert =  async (req, res, err) => {
    // .then() => qu'est ce que je fais si ça passe
    //.catch => ce que je fais si ça cass
    await userService.insert(req, res)
        .then((user)=> {
            res.status(200).send({
                message : 'Votre compte a été créer',
                user,
            })
        }
        ).catch(() => {
            res.status(500).send({
                message: "un probleme est survenu",
            });
        
        })
}

const findAll = (req, res) => {
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
        // const {email, password} = req.body
        
        const user = await UserModel.find({email:req.body.email});
       //const role = await roleController.findByRole(user[0].role);
       // return user
        if(user && await userService.matchPassword(req.body.password, user[0].password)){
        console.log("password verifier")
            // res.json({
            //     _id: user._id,
            //     firstname: user.firstname,
            //     lastname: user.lastname,
            //     email: user.email,
            //     token: generateToken(user._id)
            // })

        }else{
            res.status(401)
            throw new Error("Invalid Email or Password")
        }
    })

const profileUser = asyncHandler(async (req, res) => {
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

module.exports = {findAll, checkUser, profileUser, insert}
