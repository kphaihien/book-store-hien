

const express=require("express");
const router=express.Router();
const { getDashboardStats } = require("../controllers/stats.controller");
const authenToken = require("../middlewares/authenToken");
const verifyAdmin = require("../middlewares/verifyAdmin");

router.get("/dashboard-stats", authenToken, verifyAdmin, getDashboardStats)
module.exports=router;