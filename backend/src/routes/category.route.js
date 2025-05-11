const express = require("express");

const {createCategory, getCategory}=require("../controllers/category.controller")
const router = express.Router();

router.post("/create-category",createCategory)
router.get("/", getCategory)

module.exports=router