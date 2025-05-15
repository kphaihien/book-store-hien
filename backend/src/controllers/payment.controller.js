
const {ProductCode,VnpLocale,dateFormat}=require("vnpay")
const vnpay = require("../config/vnpay.config");
const Order = require("../models/order.model");


const returnUrl = async (req, res) => {
   try {
       const verify = vnpay.verifyReturnUrl(req.query);
       if(verify.isVerify===false){
        return res.status(404).send({message:"Xác định tính toàn vẹn thất bại!"})
       }
       if (verify.isSuccess===false) {
           return res.send('Đơn hàng thanh toán thất bại');
       }
       if(verify.vnp_ResponseCode="00"){
            const order=await Order.findByIdAndUpdate(
                verify.vnp_TxnRef,
                {$set:{payment_status:"paid"}}
            )
       }
    //    res.redirect(`http://localhost:5173/orders`);
       res.redirect(`https://book-store-hien-front-end.onrender.com`);
   } catch (error) {
    console.log(error);
   
   }
}

module.exports = {returnUrl }