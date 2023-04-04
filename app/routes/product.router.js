const express = require('express')
const productController = require("../controllers/product.controller.js");
const {protectProduct,upload} = require('../middlewares/product.middleware')
const protectAdmin = require('../middlewares/admin.middleware');



const routers = express.Router()


routers.get("/", productController.findAll);
routers.get("/nouveau", productController.findAllNouveau);
routers.get("/page/:name/:id", productController.findAllPage);
routers.post("/create-product", [protectAdmin,protectProduct,upload.single('image')], productController.create);
routers.get("/topProduit", productController.findAllTop);
routers.delete("/delete/:id", protectAdmin,  productController.deleteProduct);
routers.get("/detail/:id", productController.findOne)
routers.post("/update/:id", [protectAdmin,upload.single('image')], productController.updateProduct);



module.exports = routers
