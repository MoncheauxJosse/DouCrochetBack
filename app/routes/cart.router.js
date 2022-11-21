const express = require('express')
const cartController = require("../controllers/cart.controller");
const router = express.Router()

router.post("/", cartController.addToCart);
router.get("/", cartController.getCart);

module.exports = router