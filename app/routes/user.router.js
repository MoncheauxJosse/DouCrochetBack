const express = require("express");
const UserController = require('../controllers/user.controller')
const protect = require('../middlewares/auth.middleware')

const router = express.Router()

router.get("/", UserController.findAll)
router.post("/login", UserController.checkUser)
router.get("/profile", protect, UserController.profileUser)
router.post("/register", UserController.insert)
// routers.get("/:id", controller.findOne)

module.exports = router