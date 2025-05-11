// const mongoose =require("mongoose")


// const bookSchema=new mongoose.Schema({
//     title:{
//         type:String,
//         required:true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     category: {
//         type: String,
//         required: true
//     },
//     trending: {
//         type: Boolean,
//         required: true
//     },
//     coverImage: {
//         type: String,
//         required: true
//     },
//     oldPrice: {
//         type: Number,
//         required: true
//     },
//     newPrice: {
//         type: Number,
//         required: true
//     },
//     createdAt:{
//         type:Date,
//         default:Date.now,
//     }
// },{
//     timestamps:true,
// });

// const Book=mongoose.model('Book',bookSchema);

// module.exports=Book;


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Định nghĩa schema cho đánh giá (reviews)
// const reviewSchema = new Schema({
//     user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//     review_rating: { type: Number, required: true, min: 1, max: 5 },
//     review_content: { type: String },
//     createdAt: { type: Date, default: Date.now }
// });

// Định nghĩa schema chính cho products
const bookSchema = new Schema({
    book_name: { type: String, required: true },//tên sách
    link_alt: { type: String,default:null },
    book_descriptions: { type: String,default:null },
    book_img: { type: String },//ảnh bìa
    sold_quantity: { type: Number, default: 0 },//đã bán
    category_id: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    old_price: { type: Number, required: true, min: 0 },
    new_price: { type: Number, min: 0,default:null },
    stock: { type: Number, required: true, min: 0 },//số lượng còn
    is_stock: { type: Boolean, default: true },//có còn không
    // reviews: [reviewSchema],
    review_star:{type:Number,min:0,default:null},
    author:{type:String,default:null}
},{
    timestamps:true,
});

// Tạo index cho product_name và category_id để tối ưu tìm kiếm
bookSchema.index({ product_name: 1 });
bookSchema.index({ category_id: 1 });

// Tạo model từ schema
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;