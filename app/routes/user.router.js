const express = require("express");
const UserController = require('../controllers/user.controller')
const protect = require('../middlewares/auth.middleware')
const protectAdmin = require('../middlewares/admin.middleware')

const router = express.Router()

router.get("/", UserController.findAll)
router.post("/login", UserController.checkUser)
router.put("/delete/:id", protectAdmin, UserController.deleteUser)
router.get("/profile", protect, UserController.profileUser)
router.post("/register", UserController.insert)
router.put("/modif/:id", protectAdmin,UserController.editUser)
router.put("/update/:id", protect, UserController.updateUser)


module.exports = router