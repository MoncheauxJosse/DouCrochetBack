const factureLine = require("../models/productline.model")

const findAll = async ()  => {
    return await factureLine.find()
   }

   const create = async (body) => {
    const callFactureLine= new factureLine(body)
    await callFactureLine.save()
}




module.exports = {findAll, create};
