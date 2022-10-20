const express = require('express') ;
const usercontroller = require('../controllers/usercontroller');

const userroute = express.Router();

userroute.get('/',usercontroller.getusers);


module.exports = userroute;
