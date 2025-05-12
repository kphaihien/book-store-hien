const express = require("express")
const User = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const JWT_SECRET = process.env.JWT_SECRET_KEY


const loginAdmin = async (req, res) => {
    const { user_name, password } = req.body
    try {
        const admin = await User.findOne({ user_name })
        if (!admin) {
            return res.status(404).send({ message: "Không tìm thấy admin phù hợp" })
        }
        if (password !== admin.password) { return res.status(401).send({ message: "Sai mật khẩu hoặc tài khoản" }) }

        const token = jwt.sign(
            { id: admin._id, username: admin.user_name, role: admin.role },//payload
            JWT_SECRET,
            { expiresIn: "1h" }
        )
        return res.status(200).json({
            message: "Xác thực thành công",
            token: token,
            user: {
                username: admin.user_name,
                role: admin.role,
            }
        })

    } catch (error) {
        console.error("Thất bại khi đăng nhập", error)
        return res.status(500).send({ message: "Thất bại khi đăng nhập" })

    }

}

const registerUser = async (req, res) => {
    const { user_name, email, password } = req.body;
    try {
        const existUser = await User.findOne({ user_name })
        const existEmail = await User.findOne({ email })
        if (existUser || existEmail) { return res.status(409).send({ message: "Đã tồn tại người dùng" }) }
        else { 
            const salt = await bcrypt.genSalt(10);
            const hashed_password = await bcrypt.hash(password, salt);
            const newUser = new User({ ...req.body, password: hashed_password, role: 'user' });
            await newUser.save();
            res.status(200).send({ message: "Đã thêm người dùng", user: newUser })
        }
    } catch (error) {
        console.error("Lỗi khi thêm sách:", error);
        return res.status(500).send({ message: "Thất bại khi tạo người dùng" })
    }
}

const loginUser = async (req, res) => {
    const loginInput=req.body.loginInput
    const password=req.body.password
    try {
        const user = await User.findOne({ $or:[{user_name:loginInput},{email:loginInput}] })
        if (!user) { return res.status(401).send({ message: "Tài khoản hoặc mật khẩu không hợp lệ" }) }

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) { return res.status(401).send({ message: "Tài khoản hoặc mật khẩu không hợp lệ" }) }
        const token = jwt.sign(
            { id: user._id, username: user.user_name, user: user.role },//payload
            JWT_SECRET,
            { expiresIn: "1h" }
        )
        if (user && validPassword) {
            return res.status(200).json({
                message: "Xác thực thành công",
                token: token,
                user: {
                    id: user._id,
                    username: user.user_name,
                    email: user.email,
                    role: user.role,
                    full_name:user.full_name,
                    default_address:user.default_address,
                    phone_number:user.user_phone
                }
            })
        }

    } catch (error) {
        console.error("Thất bại khi đăng nhập", error)
        return res.status(500).send({ message: "Thất bại khi đăng nhập" })
    }
}
module.exports = { loginAdmin, loginUser, registerUser, }