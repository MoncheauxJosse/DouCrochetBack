const adressModel = require("../models/address.model")
const userModel = require("../models/user.model")

const findOneAdress = async function(req, res){
   const adresse = await adressModel.findByID()

}

const insert = async function(req, res){
    const adresseCreate = new adressModel({
        country:req.body.country,
        city:req.body.city,
        cityCode:req.body.cityCode,
        street:req.body.street,
        number:req.body.number,
    })
    if(adresseCreate){
        const adresseSave = await adresseCreate.save()
        return adresseSave
    }
    else{
        res.send({
            message :'Un ou plusieur champs de votre adresse non invalide'
        });
    }
}

const AdressAdmin = async function(country, city, citycode, street,number){
    const adresseCreate = new adressModel({
        country:country,
        city:city,
        cityCode:citycode,
        street:street,
        number:number,
    })
    if(adresseCreate){
        const adresseSave = await adresseCreate.save()
        return adresseSave
    }
    else{
        res.send({
            message :'Un ou plusieur champs de votre adresse non invalide'
        });
    }
}
module.exports = {insert, AdressAdmin}
