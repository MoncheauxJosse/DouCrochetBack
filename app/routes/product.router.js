const express = require('express')
const productController = require("../controllers/product.controller.js");


const routers = express.Router()

routers.get("/nouveau", productController.findAllNouveau);
routers.get("/", productController.findAll);
routers.post("/create-product", productController.create);
routers.delete("/delete/:id", productController.deleteProduct);
routers.get("/detail/:id", productController.findOne)

module.exports = routers
