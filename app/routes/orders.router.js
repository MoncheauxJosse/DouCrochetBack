const express = require("express");
const OrderController = require('../controllers/order.controller')

const routers = express.Router()

routers.get("/", OrderController.findAll);


module.exports = routers