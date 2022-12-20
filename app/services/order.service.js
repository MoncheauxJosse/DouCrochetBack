const Order = require("../models/order.model");


const findUser = async (reqBody)  => {
    console.log(reqBody)
    return await Order.find({user: reqBody})
   }

   const create = async (Body)  => {

    const newOrder = new Order(Body)
    await newOrder.save()
   
   }

   const findOrders = async ()  => {
    return await Order.find().populate('user').populate('productLine')
   }

   module.exports = {findUser,create, findOrders};