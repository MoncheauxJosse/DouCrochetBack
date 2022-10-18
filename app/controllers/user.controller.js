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
    const password = bcrypt.hashSync(req.body.password, 10);

    const role = await Role.findByRole("client")
    console.log(role[0])

    const adresseCreate = await AdresseController.insert(req)
    // const adresse = await AdresseController.findOne(adresseCreate)
    console.log(adresseCreate)

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
    res.send('Compte créé, veuillez vous connecter')
    }

module.exports = {insert}