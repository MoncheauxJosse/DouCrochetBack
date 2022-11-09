const express = require('express')
const categoryController = require("../controllers/category.controller.js");

const routers = express.Router()

routers.get("/create-product", categoryController.findAll);


module.exports = routers