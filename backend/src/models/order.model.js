// const mongoose=require("mongoose")



// const orderSchema=new mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     phoneNumber:{
//         type: String,
//         required: true
//     },
//     shippingAddress:{
//         type: String,
//         required: true
//     },
//     productIds:[
//         {
//             id:{
//             type:mongoose.Schema.Types.ObjectId,
//             ref:'Book',
//             required:true,
//             },

//         }
//     ],
//     totalPrice:{
//         type:Number,
//         required:true,
//     }
// },{
//     timestamps:true,
// })

// const Order=mongoose.model('Order',orderSchema)


// module.exports=Order;


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Định nghĩa schema cho địa chỉ (order_address)


// Định nghĩa schema cho thông tin người mua (order_buyer)
const buyerSchema = new Schema({
    order_name: { type: String, required: true },
    order_phone: { type: String, required: true },
    order_address: { type: String, required: true }
});

// Định nghĩa schema cho chi tiết đơn hàng (order_details)
const orderDetailSchema = new Schema({
    book_id: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, required: true, min: 1 },
    unit_price: { type: Number, required: true, min: 0 }//giá
});

// Định nghĩa schema chính cho orders
const orderSchema = new Schema({
    customer_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },//id người đặt
    order_buyer: { type: buyerSchema, required: true },//tên, địa chỉ, sdt người nhận
    order_details: [orderDetailSchema],//đơn hàng gồm những gì
    order_shipping_cost: { type: Number, default: 0, min: 0 },
    order_total_cost: { type: Number, required: true, min: 0 },
    order_status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'cancelled'],
        default: 'pending',
    },
    payment_type:{
        type:String,
        enum:["momo","cash"],
        required:true,
        default:"cash"
    }//loại thanh toán
},{
    timestamps:true,
});

// Tạo index cho customer_id để tối ưu tìm kiếm
orderSchema.index({ customer_id: 1 });

// Tạo model từ schema
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;