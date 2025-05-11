const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Định nghĩa schema chính cho categories
const categorySchema = new Schema({
    category_name: { type: String, required: true },
},{
    timestamps:true
});


// Tạo model từ schema
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;