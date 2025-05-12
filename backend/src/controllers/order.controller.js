const Order=require("../models/order.model");

//create order

const createOrder = async (req, res) => {
    try {
        const newOrder = new Order({ ...req.body });
        const savedOrder=await newOrder.save();
        res.status(200).send({ message: "Đã tạo đơn hàng", order:savedOrder })
    } catch (error) {
        console.error("Lỗi khi tạo đơn hàng:", error);
        res.status(500).send({ message: "Thất bại khi tạo đơn hàng" })
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
module.exports={createOrder,fetchAllUserOrder,countOrders}