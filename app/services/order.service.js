const Order = require("../models/order.model");
const OrderStateModel = require("../models/orderState.model");
const OrderModel = require("../models/order.model");

const findUser = async (reqBody)  => {
    console.log("id",reqBody)
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

   
   

   module.exports = {findUser,create, findOrders};