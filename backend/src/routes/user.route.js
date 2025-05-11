const express=require("express")
const authenToken=require("../middlewares/authenToken")
const verifyAdmin = require("../middlewares/verifyAdmin")
const { countUsers, fetchAllUsers, changeUserInformation } = require("../controllers/user.controller")
const router=express.Router()





router.get("/count",authenToken,verifyAdmin,countUsers)

router.get("/",authenToken,verifyAdmin,fetchAllUsers)


//
router.post("/update-profile",authenToken,changeUserInformation)

module.exports=router;