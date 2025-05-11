

const express=require("express")
const router=express.Router();
const { postABook, getAllBooks, getSingleBook, updateBook, deleteBook, countBooks, fetchBooksByPage, fetchTrendingBooks, fetchTopSellerBooks, searchBooks } = require("../controllers/book.controller");
const authenToken = require("../middlewares/authenToken");
const { uploadImage } = require("../config/multer.config");
const verifyAdmin = require("../middlewares/verifyAdmin");

//add book
router.post("/create-book", uploadImage.single('image'),authenToken,verifyAdmin,postABook)
//uploadImage.single('image')

//get all book
router.get("/", getAllBooks)

//count books
router.get("/count", authenToken, verifyAdmin, countBooks)

//
router.get("/paginatied",fetchBooksByPage)

//lấy dữ liệu sách bán chạy(>50 quyển)
router.get("/top-sellers",fetchTopSellerBooks)

//tìm kiếm sách theo tên
router.get("/search",searchBooks)

//get single book
router.get("/:id",getSingleBook)


//update book
router.put("/edit/:id",authenToken,verifyAdmin,updateBook)

//deletebook
router.put("/delete/:id",authenToken,verifyAdmin,deleteBook)

//get single book, luôn luôn để cuối cùng
router.get("/:id", getSingleBook)
module.exports=router;