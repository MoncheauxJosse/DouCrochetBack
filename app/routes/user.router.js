const express = require("express");
// const asyncHandler = require("express-async-handler");
const User = require('../models/user.model');
const usercontroller = require('../controllers/user.controller')

const userRoute = express.Router()

userRoute.get("/users", usercontroller.findUser)

// userRoute.post("/login", asyncHandler(async (req, res) => {
//     const {email, password} = req.body
//     const user = await User.findOne({email});
//     if(user && (await user.matchPassword(password))){
//         res.json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             isAdmin: user.isAdmin,
//             token: null,
//             createdAt: user.createdAt
//         })
//     }else{
//         res.status(401)
//         throw new Error("Invalid Email or Password")
//     }
// }))

module.exports = userRoute