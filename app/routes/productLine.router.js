const express = require("express");
const protectAdmin = require('../middlewares/admin.middleware')
const ProductLineController = require('../controllers/productLine.controller')

const routers = express.Router()

routers.post("/add", ProductLineController.insert)


module.exports = routers