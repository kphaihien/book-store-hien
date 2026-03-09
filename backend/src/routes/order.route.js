const express = require("express");
const { createOrder, fetchAllUserOrder, countOrders, searchOrdersByAdmin,changeOrderStatus} = require("../controllers/order.controller");
const authenToken = require("../middlewares/authenToken")
const verifyAdmin = require("../middlewares/verifyAdmin");

const router = express.Router();

//create order
router.post("/create-order",authenToken,verifyAdmin,createOrder);
router.get("/get-orders-by-user-id/:currentUserId",authenToken,fetchAllUserOrder)

router.get("/search",authenToken,verifyAdmin,searchOrdersByAdmin)

router.get("/count",authenToken,verifyAdmin,countOrders)

router.put("/change-order-status/:orderId",authenToken,verifyAdmin,changeOrderStatus)
module.exports = router;