const productController = require("../controllers/product.controller.js");
const express = require("express");


const routers = express.Router()

routers.get("/", productController.findAll);
routers.post("/", productController.insert);
// routers.get("/:id", controller.findOne)

module.exports = routers
