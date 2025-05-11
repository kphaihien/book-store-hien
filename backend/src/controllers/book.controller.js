const Category = require("../models/category.model");
const Book = require("../models/book.model");



//add a book
const postABook = async (req, res) => {
    
    try {
        const {book_name}=req.body
        const checkBook=await Book.findOne({book_name:book_name})
        if (checkBook){return res.status(409).send({message:"Đã tồn tại sách này rồi"})}
        const imagePath = req.file ? `${req.file.filename}` : null;

        const newBook = new Book({ ...req.body,book_img:imagePath});
        await newBook.save();
        res.status(200).send({ message: "Đã thêm sách", book: newBook })
    } catch (error) {
        console.error("Lỗi khi thêm sách:", error);
        res.status(500).send({ message: "Thất bại khi thêm sách" })

    }
}

//get all book
const getAllBooks=async(req,res)=>{
    try {
        const books=await Book.find();
        res.status(200).send(books)
    } catch (error) {
        console.log("lỗi khi tải danh sách sách :",error);
        res.status(500).send({message:"lỗi khi tải danh sách sách"})
    }
}

//get single book
const getSingleBook=async(req,res)=>{
    try {
        const {id}=req.params
        const book=await Book.findById(id).populate('category_id','category_name')
        if(!book){
            res.status(404).send({message:"Không tồn tại"})
        }

        res.status(200).send(book)
    } catch (error) {
        console.log("lỗi khi tải danh sách sách :", error);
        res.status(500).send({ message: "lỗi khi tải danh sách sách" })
    }
}


//updatebook
const updateBook=async(req,res)=>{
    try {
        const {id}=req.params;
        const updatedBook=await Book.findByIdAndUpdate(id,req.body,{new:true})
        if(!updateBook){
            res.status(404).send("Không tồn tại")
        }
        res.status(200).send({message:"Sửa thành công",book:updatedBook})
    } catch (error) {
        console.log("lỗi khi cập nhật sách :", error);
        res.status(500).send({ message: "lỗi khi tải danh sách sách" })
    }
}

//deleteBook
const deleteBook=async(req,res)=>{
    try {
        const { id } = req.params;
        const deleteBook = await Book.findByIdAndUpdate(id)
        if (!deleteBook) {
            res.status(404).send("Không tồn tại")
        }
        res.status(200).send({ message: "Xóa thành công", book: deleteBook })
    } catch (error) {
        console.log("lỗi khi xóa ", error);
        res.status(500).send({ message: "lỗi khi xóa sách" })
    }
}

const countBooks=async(req,res)=>{
    try {
        const number_books=await Book.countDocuments()
        return res.status(200).send({count_book:number_books})
    } catch (error) {
        console.error("Lỗi khi countBooks:", error.message, error.stack);
        return res.status(500).send({message:"Đã xảy ra lỗi!"})
    }
}

const fetchBooksByPage=async(req,res)=>{
    try {
        const page= parseInt(req.query.page)||1
        const limit=parseInt(req.query.limit)||10
        const category_id=req.query.category_id||""
        const skip=(page-1)*limit
        
        if(category_id){
            const books = await Book.find({category_id:category_id}).select("-link_alt -createdAt -updatedAt").skip(skip).limit(limit)
            const totalDoc = await Book.countDocuments({category_id:category_id});
        return res.status(200).send({books,page:page,totalPages:Math.ceil(totalDoc/limit)})
        }else{
            const books = await Book.find().select("-link_alt -createdAt -updatedAt").skip(skip).limit(limit)
            const totalDoc = await Book.countDocuments();
            return res.status(200).send({ books, page: page, totalPages: Math.ceil(totalDoc / limit)})
        }
        

        
    } catch (error) {
        return res.status(500).send({message:"Xảy ra lỗi khi fetch"})
    }
}

const fetchTopSellerBooks=async(req,res)=>{
    try {
        const books=await Book.find({sold_quantity:{$gt:50}})
        return res.status(200).send({books})
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:"Không có dữ liệu" })
    }
}

const searchBooks=async(req,res)=>{
    const q=req.query.q ||""
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 12
    const skip = (page - 1) * limit
    try {
        const books = await Book.find({
            book_name: { $regex: q, $options: 'i' } // không phân biệt hoa thường
        }).collation({ locale: 'vi', strength: 1 }).skip(skip).limit(limit); // không phân biệt dấu tiếng Việt
        const totalDoc = await Book
                        .countDocuments({ book_name: { $regex: q, $options: 'i' } })
                        .collation({ locale: 'vi', strength: 1 });;
        return res.status(200).send({books,totalPages:Math.ceil(totalDoc/limit)})

    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Xảy ra lỗi khi tìm sách"})
    }
}

module.exports={
    postABook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook,
    countBooks,
    fetchBooksByPage,
    fetchTopSellerBooks,
    searchBooks
}