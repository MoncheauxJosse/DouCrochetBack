const controller = require("../controllers/role.controller.js");
const express = require("express");


const routers = express.Router()

routers.get("/", controller.getRole)

module.exports = routers