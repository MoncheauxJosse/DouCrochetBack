const Order = require("../models/order.model");

const findUser = async (reqBody)  => {
    console.log(reqBody)
    return await Order.find({user: reqBody})
   }

   module.exports = {findUser};