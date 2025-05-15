import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form"
import { useAuth } from '../../context/AuthContext';
import { useCreateOrderMutation } from '../../redux/features/orders/orderApi';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { clearCart, selectCartQuantity,} from '../../redux/features/cart/cartSlice';
import { FaArrowLeftLong } from "react-icons/fa6";



const CheckoutPage = () => {
  const { currentUser } = useAuth();//để lại để làm authen
  const cartItems = useSelector(state => state.cart.cartItems);
  const totalPrice=useSelector(state=>state.cart.totalPrice)
  // const totalPrice = useSelector(selectCartTotal)
  const totalBook=useSelector(selectCartQuantity)
  const navigate=useNavigate()
  const dispatch=useDispatch()


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({defaultValues:{
    order_address:currentUser.default_address
  }})

  const [createOrder, { isLoading, error }] = useCreateOrderMutation()

  const onSubmit = async (data) => {

    const newOrder = {
      customer_id:currentUser.id,
      order_buyer: {
        order_name: data.order_name,
        order_phone: data.order_phone, 
        order_address: data?.order_address, 
      },
      order_details:
        cartItems.map((item,index)=>(
          {
            book_id:item.book._id,
            quantity:item.quantity,
            unit_price:item.book.new_price||item.book.old_price
          }
        ))
      ,
      order_total_cost:totalPrice,
      payment_type:data.payment_type
    }
    
    try {
      const response=await createOrder(newOrder).unwrap()
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "Đặt hàng thành công",
        showConfirmButton: true,
        timer: 1500
      });
      dispatch(clearCart())
      window.open(response.paymentUrl, '_blank');
      await navigate("/orders")
    } catch (error) {
      if(error.code===500){
        console.log("Xảy ra lỗi khi tạo đơn hàng: ",error);
      }
      console.log(error);

    }
  }
  
  
  if (isLoading) {return <p>Đang tải....</p>}
  return (
    <>
      <div className='w-full h-full p-10 bg-gray-200 rounded-sm py-18'>
        <div className='flex flex-col gap-12'>
          <div className='flex flex-col gap-2'>
            <Link to="/cart">
              <div className='flex flex-row items-center gap-3 cursor-pointer hover:underline'>
                <FaArrowLeftLong className='cursor-pointer hover:text-red-500' size="35" /> <span className='text-md'>Quay lai giỏ hàng</span>
              </div>
            </Link>
            <p className='text-2xl font-bold'>Đơn đặt hàng #1</p>
            <p >Tổng tiền: <span className='font-bold'>{totalPrice}</span></p>
            <p className='font-semibold'>Số sản phẩm: {totalBook}</p>
          </div>

          <div className='flex flex-row p-6 bg-white rounded-md'>
            <div className='w-1/3 '>
              <p className='text-xl font-bold'>
                Thông tin giao hàng
              </p>
              <p className='text-gray-400'>Mời điền đầy đủ thông tin giao hàng</p>
            </div>

            <div className='w-2/3'>
              <form className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label className='font-semibold'>Họ và tên</label>
                  <input
                    type="text"
                    name="name"
                    {...register("order_name", { required: true })}
                    className="w-full px-4 py-2 bg-gray-100 rounded-sm shadow-sm "
                    required
                  />
                </div>

                <div>
                  <label className='font-semibold'>Số điện thoại</label>
                  <input
                    type="number"
                    {...register("order_phone", { required: true })}

                    className="w-full px-4 py-2 bg-gray-100 rounded-sm shadow-sm [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none "
                    required
                  />
                </div>


                <div>
                  <label className='font-semibold'>Địa chỉ giao hàng</label>
                  <input
                    type="text"
                    {...register("order_address", { required: true })}
                    className='w-full px-4 py-2 bg-gray-100 rounded-sm shadow-sm '
                    required
                  />
                </div>
                
                <div className='flex flex-col max-w-1/3'>
                  <label htmlFor="mySelect" className="mb-2 text-sm font-medium text-gray-700">
                    Chọn cách thanh toán:
                  </label>
                  <select
                    {...register("payment_type", { required: true })}
                    id="payment_type"
                    className="p-2 border border-gray-300 rounded-lg"
                  >
                    <option key="cash" value="cash">Thanh toán khi nhận hàng</option>
                    <option key="vnpay" value="vnpay">Chuyển khoản VNPay</option>
                  </select>
                </div>

                <div className='flex justify-end pt-4'>
                  <button type='submit' className='p-1 px-4 font-bold transition transform bg-yellow-400 rounded-lg cursor-pointer hover:scale-105'>
                    Đặt hàng
                  </button>
                </div>


              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CheckoutPage