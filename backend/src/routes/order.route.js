const express = require("express");
const { createOrder, fetchAllUserOrder, countOrders } = require("../controllers/order.controller");
const authenToken = require("../middlewares/authenToken")
const verifyAdmin = require("../middlewares/verifyAdmin");
const router = express.Router();

//create order
router.post("/create-order",authenToken,verifyAdmin,createOrder);
router.get("/get-orders-by-user-id/:currentUserId",authenToken,fetchAllUserOrder)
router.get("/count",authenToken,verifyAdmin,countOrders)
module.exports = router;