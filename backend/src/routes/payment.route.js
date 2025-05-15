const { returnUrl } = require("../controllers/payment.controller");
const express = require("express");

const router = express.Router();

router.get("/vnpay-return",returnUrl)
module.exports = router;
