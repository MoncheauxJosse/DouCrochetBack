const express = require('express')
const productController = require("../controllers/product.controller.js");
const {protectProduct,upload} = require('../middlewares/product.middleware')


const routers = express.Router()

routers.get("/nouveau", productController.findAllNouveau);
routers.get("/", productController.findAll);
routers.post("/create-product",protectProduct,upload.single('image'), productController.create);

routers.get("/topProduit", productController.findAllTop);
routers.delete("/delete/:id", productController.deleteProduct);
routers.get("/detail/:id", productController.findOne)


module.exports = routers
