const express = require('express')
const productController = require("../controllers/product.controller.js");


const routers = express.Router()

routers.get("/nouveau", productController.findAllNouveau);
routers.get("/", productController.findAll);
routers.post("/create-product", productController.create);
routers.get("/topProduit", productController.findAllTop);
// routers.get("/:id", controller.findOne)

module.exports = routers
