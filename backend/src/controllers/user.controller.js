const express=require("express")
const User=require("../models/user.model")
const bcrypt=require("bcryptjs")
const jwt = require("jsonwebtoken")
const { default: mongoose } = require("mongoose")


const JWT_SECRET = process.env.JWT_SECRET_KEY



const countUsers = async (req, res) => {
    try {
        const numberUsers = await User.countDocuments({ role: "user" })
        return res.status(200).send({ numberUsers: numberUsers })
    } catch (error) {
        console.error("Lỗi khi countUsers", error.message, error.stack);
        return res.status(500).send({ message: "Đã xảy ra lỗi!" })
    }
}

const fetchAllUsers=async(req,res)=>{
    try {
        const users=await User.find({role:"user"}).select("-password -user_gender -role -wishlist")
        if(!users){return res.status(404).send({message:"Không tìm thấy người dùng nào!"})}
        return res.status(200).send({users:users})
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Đã xảy ra lỗi!" })
    }
}
const changeUserInformation=async(req,res)=>{
    const user_id=req.body.id
    const full_name=req.body.full_name
    const phone_number=req.body.phone_number
    const default_address=req.body.default_address
    try {
        // const user=await User.findOne({_id:user_id})
        const updated = await User.updateOne(
            { _id: user_id },
            {
                $set: {
                    full_name:full_name,
                    user_phone:phone_number,
                    default_address:default_address
                }
            }
        );
        if (updated.matchedCount===0) { return res.status(404).send({ message: "Không tìm thấy người dùng"}) }
        const updatedUser=await User.findOne({_id:user_id})
        return res.status(200).send(updatedUser)
    } catch (error) {
        console.log(error);
        return res.status(404).send({ message: "Xảy ra lỗi khi thay đổi thông tin người dùng" })
    }
}

const deleteUser=async(req,res)=>{
    try {
        const user_id=req.params.id;
        const user= await User.findById(user_id);
        if(!user){return res.status(404).send({message:"Không tìm thấy người dùng!"})}
        await User.findByIdAndDelete(user_id)
        return res.status(200).send({message:"Xóa thành công!"})
    } catch (error) {
        return res.status(500).send({message:`Lỗi ở server: ${error}`})
    }
}
const searchUser=async(req,res)=>{
    const q = req.query.q
    try {
        if(q===""){
            const users=await User.find()
            return res.status(200).send({ users })
        }
        const isValidId=mongoose.Types.ObjectId.isValid(q)
        const users = await User.find({
            $or:[
                {user_name: { $regex: q, $options: 'i' }},
                {email:{$regex:q}},
                ...(isValidId?[{_id:q}]:[])
            ]
        }).collation({ locale: 'vi', strength: 1 }) // không phân biệt dấu tiếng Việt
        return res.status(200).send({ users })

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Xảy ra lỗi khi tìm người dùng" })
    }
}
module.exports={countUsers,fetchAllUsers,changeUserInformation,deleteUser,searchUser}