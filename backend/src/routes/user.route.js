const express=require("express")
const authenToken=require("../middlewares/authenToken")
const verifyAdmin = require("../middlewares/verifyAdmin")
const { countUsers, fetchAllUsers, changeUserInformation, deleteUser, searchUser } = require("../controllers/user.controller")
const router=express.Router()





router.get("/count",authenToken,verifyAdmin,countUsers)

router.get("/",authenToken,verifyAdmin,fetchAllUsers)

router.get("/search",authenToken,verifyAdmin,searchUser)

//
router.post("/update-profile",authenToken,changeUserInformation)

//xóa user
router.delete("/delete/:id",authenToken,verifyAdmin,deleteUser)
module.exports=router;