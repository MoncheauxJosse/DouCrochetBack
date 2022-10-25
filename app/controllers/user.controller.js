const Role = require('../controllers/role.controller')
const bcrypt = require('bcryptjs')
const AdresseController = require('../controllers/adresse.controller')
const User = require('../models/user.model');
const asyncHandler = require("express-async-handler");
const generateToken = require('../security/jwt.security');
const jwtSecurity = require('../security/jwt.security');
const roleService = require('../services/role.service')

const insert =  async (req, res) => {
    if(!req.body){
        res.status(500).send({
            message: 'Le champ ne peut être vide!',
        });
    }
    let password = "";
    if(req.body.password===req.body.Confirmpassword){
        
        password = bcrypt.hashSync(req.body.password, 10);
    }
    //Verification du role en BDD
    //TODO: A revoir créer service role adresse et user
    const role = await Role.findByRole("client")
    //verification de la validité de l'adresse Email et si elle éxiste ou pas en BDD
    const adresseCreate = await adresseController.insert(req)
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
    // userModel.plugin(mongooseDisabled);
    User.save();
    res.send({
        message : 'Compte créé, veuillez vous connecter'})
    }

//On récupère les utilisateurs
//TODO: A revoir a placer dans un service
const findAll = (req, res) => {
    userModel.find()
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
    const user = await User.findOne({email}).populate('role');
    console.log(user)
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
