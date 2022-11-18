const express = require('express')
const categoryController = require("../controllers/category.controller.js");
const protectAdmin = require('../middlewares/admin.middleware')


const routers = express.Router()


routers.get("/create-product", categoryController.findAll);
routers.post("/create-category", categoryController.create);


module.exports = routers