
const userModel = require('../models/user.model');
const Role = require('../controllers/role.controller')
const bcrypt = require('bcryptjs')
const AdresseController = require('../controllers/adresse.controller')
const asyncHandler = require("express-async-handler");
const generateToken = require('../security/jwt.security');
const userService = require('../services/user.service');

const insert =  async (req, res) => {
    if(!req.body){
        res.status(500).send({
            message: 'Le champ ne peut être vide!',
        });
    }
    let password = "";
    if(req.body.password===req.body.confirmpassword){       
        password = bcrypt.hashSync(req.body.password, 10);
    }
    //Verification du role en BDD
    const role = await Role.findByRole("client")
    //verification de la validité de l'adresse Email et si elle éxiste ou pas en BDD
    const adresseCreate = await AdresseController.insert(req)
    //insert user dans la bdd
    const newUser = await userService.insert(req, password, role, adresseCreate, res)
    if(newUser){
        return send(res)
    }
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
        const {email, password} = req.body
        const user = await userModel.findOne({email});
        if(user && await userModel.matchPassword(password)){
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
