const factureLine = require("../models/productline.model")

const findAll = async ()  => {
    return await factureLine.find()
   }

   const create = async (body) => {
    const callFactureLine= new factureLine({
        price_ht: body.price_ht,
        quantity: body.quantity,
        product: body.product
    })
    const productLine = await callFactureLine.save()
    return productLine
}





module.exports = {findAll, create};
