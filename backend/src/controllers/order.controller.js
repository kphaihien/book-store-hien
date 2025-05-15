const { default: mongoose } = require("mongoose");
const Order=require("../models/order.model");
const { ProductCode, VnpLocale, dateFormat } = require("vnpay")
const vnpay = require("../config/vnpay.config")
//create order

const createOrder = async (req, res) => {
    try {
        const newOrder = new Order({ ...req.body });
        const savedOrder=await newOrder.save();
        if(req.body.payment_type==="vnpay"){
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const ipAddr = req.headers['x-forwarded-for'] ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                req.connection.socket.remoteAddress;
            const paymentUrl = vnpay.buildPaymentUrl({
                vnp_Amount: savedOrder.order_total_cost,
                vnp_IpAddr: ipAddr,
                vnp_TxnRef: savedOrder._id,
                vnp_OrderInfo: `Thanh toan don hang ${savedOrder._id}`,
                vnp_OrderType: ProductCode.Other,
                // vnp_ReturnUrl: 'http://localhost:3000/api/payment/vnpay-return',
                vnp_ReturnUrl: 'https://book-store-hien-backend.onrender.com/api/payment/vnpay-return',
                vnp_Locale: VnpLocale.VN, // 'vn' hoặc 'en'
                vnp_CreateDate: dateFormat(new Date()), // tùy chọn, mặc định là thời gian hiện tại
                vnp_ExpireDate: dateFormat(tomorrow), // tùy chọn
            });
            return res.status(200).send({ message: "Đã tạo đơn hàng", order: savedOrder,paymentUrl })
        }else{
        return res.status(200).send({ message: "Đã tạo đơn hàng", order:savedOrder })}
    } catch (error) {
        console.error("Lỗi khi tạo đơn hàng:", error);
        res.status(500).send({ message: "Thất bại khi tạo đơn hàng" })
    }
}

const searchOrdersByAdmin=async(req,res)=>{
    const q = req.query.q
    try {
        if (q === "") {
            const orders = await Order.find()
            return res.status(200).send({orders })
        }
        const isValidId = mongoose.Types.ObjectId.isValid(q)
        const orders = await Order.find({
            $or: [
                ...(isValidId ? [{ _id: q},
                                {customer_id:q }] : [])
            ]
        })
        return res.status(200).send({ orders })

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Xảy ra lỗi khi tìm người dùng" })
    }
}

const fetchAllUserOrder=async(req,res)=>{
    const {currentUserId} =await req.params
    try {    
        // const orders=await Order.find({customer_id:currentUserId})
        const orders = await Order.find({ customer_id: currentUserId })
            .populate({
                path: 'order_details.book_id',
                select: 'book_name book_img' // Chỉ lấy book_name và book_img từ Book
            }).lean()
        const transformedOrders = orders.map(order => ({
            ...order,
            order_details: order.order_details.map(detail => ({
                book_name: detail.book_id.book_name,
                book_img: detail.book_id.book_img,
                quantity: detail.quantity,
                unit_price: detail.unit_price
            }))
        }));
        res.status(200).send({message:"Thành công",orders:transformedOrders})

    } catch (error) {
        console.log(error);
        
        res.status(500).send({message:"Thất bại khi lấy dữ liệu đơn hàng"})
    }
}

const countOrders=async(req,res)=>{
    try {
        const numberOrders = await Order.countDocuments()
        return res.status(200).send({ numberOrders: numberOrders })
    } catch (error) {
        console.error("Lỗi khi countOrders", error.message, error.stack);
        return res.status(500).send({ message: "Đã xảy ra lỗi!" })
    }
}
module.exports={createOrder,fetchAllUserOrder,countOrders,searchOrdersByAdmin}