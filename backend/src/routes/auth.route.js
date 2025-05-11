const express = require("express")
const authenToken = require("../middlewares/authenToken")
const verifyAdmin = require("../middlewares/verifyAdmin")
const { loginAdmin, registerUser, loginUser, countUsers, fetchAllUsers } = require("../controllers/auth.controller")
const router = express.Router()




//login cho admin
router.post("/admin", loginAdmin)

//đăng kí cho ng dùng
router.post("/user/register", registerUser)
//đăng nhập cho người dùng
router.post("/login", loginUser)

module.exports = router;