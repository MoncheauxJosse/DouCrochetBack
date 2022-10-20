const AdresseModel = require('../models/address.model')

const insert = async function(req, res){
        const adresseCreate = new AdresseModel({
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

 const findOne = async function(adresse){
    return await AdresseModel.find({adresse:adresse})
 }

module.exports = {insert, findOne}