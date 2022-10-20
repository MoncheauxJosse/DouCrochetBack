const { findOne } = require('../models/role.model');
const UserModel = require('../models/user.model');
const Role = require('../controllers/role.controller')
const bcrypt = require('bcrypt')
const AdresseController = require('../controllers/adresse.controller')
const AdresseModel = require('../models/address.model')

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
    const role = await Role.findByRole("client")
    //verification de la validité de l'adresse Email et si elle éxiste ou pas en BDD
    const adresseCreate = await AdresseController.insert(req)
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

module.exports = {insert}