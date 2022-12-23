const Order = require("../models/order.model");


const findUser = async (reqBody)  => {
    console.log("id",reqBody)
    return await Order.find({user: reqBody})
   }

   const create = async (Body)  => {

    const newOrder = new Order(Body)
    await newOrder.save()
   
   }

   const findAll = async ()  => {
    return await Order.find().populate('user').populate('productLine')
   }

   module.exports = {findUser,create, findAll};