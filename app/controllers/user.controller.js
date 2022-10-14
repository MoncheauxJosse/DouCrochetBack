const User = require('../models/user.model');
const express = require('express')

const findUser = async (res, req) => {
    User.find().then((user)=>res.status(200).json({user}))
    .catch((err)=>res.status(500).json({err}))
}

module.exports = findUser
// const checkUser = async () => {
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
// }
