const returnProductModel = require("../models/returnProduct.model")


const create = async (body,image) => {

    console.log(body)
    const callReturnProduct= new returnProductModel({ 
        name: body.nameProduct,
        description: body.description,
        image:image,
        order: body.facture}
       )
    await callReturnProduct.save()
}

module.exports = {create}