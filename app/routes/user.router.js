const controller = require("../controllers/user.controller.js");
const express = require("express");


const routers = express.Router()

// routers.get("/", controller.findAll)
routers.post("/insert", controller.insert)
// routers.get("/:id", controller.findOne)

module.exports = routers