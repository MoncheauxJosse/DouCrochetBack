const express = require('express')
const Register = require('../controllers/controllerProduct')

const productRoute = express.Router()


productRoute.post('/',Register)

module.exports = productRoute

