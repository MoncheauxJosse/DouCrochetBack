const AdresseModel = require('../models/address.model')
const adresseService = require('../services/adresse.service')

const insert = async function(req, res){
    return await adresseService.insert(req)
    }

 const findOne = async function(adresse){
    console.log(adresse)
    return await AdresseModel.find({adresse:adresse})
 }

module.exports = {insert, findOne}