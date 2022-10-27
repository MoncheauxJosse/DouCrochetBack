const AdresseModel = require('../models/address.model')
const adresseService = require('../services/adresse.service')

//TODO a mettre dans un service

const insert = async function(req, res){
    return await adresseService.insert(req)
    }

 const findOne = async function(adresse){
    return await AdresseModel.find({adresse:adresse})
 }

module.exports = {insert, findOne}