const returnProductModel = require("../models/returnProduct.model")
const orderModel = require('../models/order.model')
const userModel = require("../models/user.model")


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

const getAllReturn = async (req, res)=>{
    const getAllReturn = returnProductModel.find().populate([{
        path : 'order',
        model : 'Order',
            populate:{
                path : 'user',
                model: 'User',
            }
        },
    ])

    // const orderReturn = orderModel.find().populate('user')
   

    return getAllReturn
    
 }
module.exports = {create, getAllReturn}