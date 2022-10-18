const express = require("express");
const usercontroller = require('../controllers/user.controller')
const protect = require('../middlewares/auth.middleware')

const userRoute = express.Router()

userRoute.get("/", usercontroller.findUser)

userRoute.post("/login", usercontroller.checkUser)

userRoute.get("/profile", protect, usercontroller.profileUser)

module.exports = userRoute