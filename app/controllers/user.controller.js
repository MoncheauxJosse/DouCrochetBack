const Role = require('../controllers/role.controller')
const bcrypt = require('bcryptjs')
const AdresseController = require('../controllers/adresse.controller')
const User = require('../models/user.model');
const jwtSecurity = require('../security/jwt.security');
const userService = require('../services/user.service');

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
    const adresseCreate = await AdresseController.insert(req)
    //création et insert de mon user dans la BDD
    const user = new User({ 
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        telephone: req.body.telephone,
        password: password,
        birthdate:req.body.birthdate,
        role:role[0]._id,
        adresse:adresseCreate._id,
    });
    // userModel.plugin(mongooseDisabled);
    user.save();
    res.send({
        message : 'Compte créé, veuillez vous connecter'})
    }

//On récupère les utilisateurs
const findAll = async (req, res) => {
    await userService.findAll(req)
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
const checkUser = async (req, res) => {
    return await userService.checkUser(req, res)
}

const profileUser = async (req, res) => {
    return await userService.profileUser(req);
}

const deleteUser = (req, res) => {
    return userService.deleteUser(req.params.id);
}

module.exports = {findAll, checkUser, profileUser, insert, deleteUser}
