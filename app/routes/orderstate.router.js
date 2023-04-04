const express = require("express");
const protectAdmin = require('../middlewares/admin.middleware')
const OrderStateController = require('../controllers/orderstate.controller')

const routers = express.Router()

routers.put("/state/:id", OrderStateController.editOrderState)


module.exports = routers