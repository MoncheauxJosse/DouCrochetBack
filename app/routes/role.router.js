const controller = require("../controllers/role.controller.js");
const express = require("express");


const routers = express.Router()

routers.get("/", controller.findAll)
routers.post("/", controller.insert)
// routers.get("/:id", controller.findOne)

module.exports = routers