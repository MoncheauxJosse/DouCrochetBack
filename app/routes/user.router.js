const express = require("express");
const UserController = require('../controllers/user.controller')
const protect = require('../middlewares/auth.middleware')

const router = express.Router()

router.get("/", UserController.findAll)
router.post("/login", UserController.checkUser)
router.put("/delete/:id", UserController.deleteUser)
router.get("/profile", protect, UserController.profileUser)
router.post("/register", UserController.insert)
router.put("/modif/:id",UserController.editUser)

module.exports = router