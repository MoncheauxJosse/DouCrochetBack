const Order = require("../models/order.model");
const OrderStateModel = require("../models/orderState.model");

const findUser = async (reqBody)  => {
    console.log("id",reqBody)
    return await Order.find({user: reqBody})
   }

   const create = async (Body)  => {

    const newOrder = new Order(Body)
    await newOrder.save()
   
   }

   const findOrders = async ()  => {
    return await Order.find()
    .populate('user')
    .populate('productLine')
    .populate('order_state')
   }

   

   module.exports = {findUser,create, findOrders};