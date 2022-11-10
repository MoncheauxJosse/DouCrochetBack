const User = require('../models/user.model');;
const Address = require('../models/address.model');
const roleService = require('./role.service')
const adresseservice = require('./adresse.service')
const asyncHandler = require("express-async-handler");
const generateToken = require('../security/jwt.security');
const bcrypt = require('bcryptjs');
const roleModel = require("../models/role.model");
const { find } = require('../models/role.model');
const { use } = require('../routes/role.router');

const checkPass = (req, res) => {
    if (req.body.password === req.body.confirmpassword) {
        return bcrypt.hashSync(req.body.password, 10);
    }
    else {
        res.send({
            message: "mot de passe incorrect"
        })
    }
}

const insert = async (req, res) => {
    const password = bcrypt.hashSync(req.body.password, 10)
    const role = await roleService.findOneRole('client');
    const adresse = await adresseservice.insert(req, res)
    const session = { password, role, adresse }
    if (session) {
        const user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            telephone: req.body.telephone,
            password: password,
            birthdate: req.body.birthdate,
            role: role._id,
            adresse: adresse._id
        });
        await user.save()
        return user.email
    }
}

const insertAdmin = async () => {
    const password = bcrypt.hashSync("test", 10);
    const role = await roleService.findOneRole('admin');
    const roleadmin = await findOneUser(role._id);
    const adresse = await adresseservice.AdressAdmin("admincountry", "admincity", "admincitycode", "adminstreet", "1")
    const session = { password, role, adresse }
    if (session) {
        const user = new User({
            firstname: "admin",
            lastname: "admin",
            email: "admin@admin.fr",
            telephone: "xxxxx",
            password: password,
            birthdate: "09090909",
            role: role._id,
            adresse: adresse._id
        });
        await user.save()
        return "ok"
    }
}

const findAll = async () => {
    return await User.find().populate("role");
}
const findOneUser = async function (role) {
    return await User.find({ role: role });
}

//Vérifier l'email et le mot de passe de l'utilisateur
const checkUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email }).populate('role');
    if (user && await user.matchPassword(password)) {
        res.json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            token: generateToken(user.email, user.role.role)
        })
    } else {
        res.status(401).send("Utilisateur non trouvé")
    }
})

const profileUser = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.user._id)
    if (user) {
        res.json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
        })
    } else {
        res.status(404);
        throw new Error("Utilisateur non trouvé");
    }
})

// Anonymiser un utilisateur

const deleteUser = async (id) => {
    console.log("delet", id);
    User.findByIdAndUpdate(id, {
        firstname: "xxxxx",
        lastname: "xxxxxx",
        telephone: "xxxxxxxxxx",
        email: "anonyme" + id + "@anonyme.fr",
        disabled: true
    },
        async function (err, docs) {
            if (err) {
                console.log(err)
            }
            else {
                console.log("Updated User : ", docs.adresse.toString());
                await Address.findOneAndUpdate(docs.adresse, {
                    street: "xxxx",
                    number: "xxxx"
                })
            }
        })
}
const editUser = async (id, roleSelect, res) => {
    const role = await roleService.findOneRole(roleSelect);
    // const user = await User.findById(id);
    console.log(id, role._id, "edit user");

    User.findByIdAndUpdate(id, { role: role._id },
        function (err, user) {
            if (err) {
                console.log(err)
                return res.status(400).send(err)
            }
            else {
                console.log("Updated User : ", user);
                return res.status(200).send(user)
            }
        })


};






module.exports = { findAll, checkUser, profileUser, insert, insertAdmin, findOneUser, checkPass, deleteUser, editUser };
