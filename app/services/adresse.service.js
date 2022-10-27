const adressModel = require("../models/address.model")

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
module.exports = {insert}
