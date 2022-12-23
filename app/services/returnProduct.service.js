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

 const modifyState = async (req, res) => {
    const selectEtat = req.body.orderSelect
    if(req.body.orderSelect==="false"){
       const state = await returnProductModel.findByIdAndUpdate(req.params.id, {etat: false})
       return state.etat
    }
    else if(req.body.orderSelect==="true"){
        const state = await returnProductModel.findByIdAndUpdate(req.params.id, {etat: true})
       return state.etat
    }
    else{
        return "erreur"
    }
        
 }

module.exports = {create, getAllReturn, modifyState}