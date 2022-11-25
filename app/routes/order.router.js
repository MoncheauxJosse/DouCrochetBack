const express = require("express");
const OrderController = require('../controllers/order.controller')

const routers = express.Router()
routers.get("/return-product/:id", OrderController.findAllFactureUser);

module.exports = routers