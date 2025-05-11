const Category = require("../models/category.model");


const createCategory=async(req,res)=>{
        try {
            const newCate = new Category({ ...req.body });
            await newCate.save();
            return res.status(200).send({ message: "Đã thêm danh mục", cate:newCate })
        } catch (error) {
            console.log(error);
        }
}
const getCategory=async(req,res)=>{
    try {
        const categories=await Category.find()
        return res.status(200).send({message:"Thành công",data:categories})
    } catch (error) {
        console.log(error);
        
    }
}

module.exports={createCategory,getCategory}