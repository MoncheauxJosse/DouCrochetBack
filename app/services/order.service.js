const Order = require("../models/order.model");
const ProductsLine = require("../models/productline.model")
const returnProductModel = require("../models/returnProduct.model");

const OrderStateModel = require("../models/orderState.model");
const OrderModel = require("../models/order.model");

const findUser = async (reqBody)  => {
    return await Order.find({user: reqBody})
   }

   const create = async (body) => {
    const callOrder = new OrderModel({
        price_ht: body.price_ht,
        order_state: body.order_state,
        addresse: body.addresse,
        user: body.user,
        productLine: body.productLine,
        ref: body.ref
    })
    return await callOrder.save()
}

   const findOrders = async ()  => {
    return await Order.find()
    .populate('user')
    .populate('productLine')
    .populate('order_state')
   }

   const findAll = async ()  => {

    const user = Order.find().populate('user')
    return user
   }

   const findAllFactureId = async (factureId)  => {

    // recupere le tableaux d'id des Ligne de produit lié a la facture
    const returnLineProducts = await Order.find({_id: factureId}).populate({
        path: 'productLine',
        model: 'ProductLine',
        populate: {
            path: 'product',
            model: 'Product'
        }
   })


    return returnLineProducts
   }

   module.exports = {findUser,create, findAll,findAllFactureId, findOrders};