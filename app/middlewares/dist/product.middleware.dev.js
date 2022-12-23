"use strict";

var Joi = require('Joi');

var asyncHandler = require('express-async-handler');

var multer = require('multer');

var uuidv4 = require('uuidv4');

var DIRECTORY = "./uploads/";

let protectProduct = asyncHandler(function _callee(req, res, next) {
  var pattern;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log("passe dans joy");
          pattern = Joi.object({
            name: Joi.string().required(),
            price: Joi.number(),
            description: Joi.string().required(),
            //image: Joi.string().required(),
            quantity: Joi.number()
          });
          pattern.validate(req);
          next();

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});


let storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    console.log("sa passe");
    cb(null, DIRECTORY);
  },
  filename: function filename(req, file, cb) {
    console.log(file, "je suis file update");
    var filename = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, filename);
  }
});
var upload = multer({
  storage: storage
});

module.exports = {
  protectProduct: protectProduct,
  upload: upload
};