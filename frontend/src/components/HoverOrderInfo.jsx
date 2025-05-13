import React from 'react'
import { useFetchOrdersByUserIdQuery } from '../redux/features/orders/orderApi'
import { useEffect } from 'react'
import { useFetchBookByIdQuery } from '../redux/features/books/bookApi'
import { IoIosCloseCircle, IoMdClose } from "react-icons/io";

const HoverOrderInfo = ({order_details,order_buyer,onClose}) => {
  return (
    <>
        <div className='fixed inset-0 z-50 flex flex-col items-center justify-center w-full h-full bg-black/10 '>
            <div className='flex flex-col w-1/3 bg-white rounded-lg h-5/12'>
          <button onClick={onClose} className='self-end cursor-pointer hover:text-red-600 '><IoMdClose  className='w-8 h-8 m-1' /></button>
                <div className='flex flex-col items-center h-full justify-evenly '>
                    <div className='flex flex-col items-center w-full '>
                        <p className='font-semibold'>Thông tin người nhận hàng:</p>
                        <ul className='w-3/4 p-2 border rounded-lg shadow-2xl'>
                          <li>Tên người nhận: {order_buyer.order_name}</li>
                          <li>Số điện thoại:{order_buyer.order_phone}</li>
                          <li>Địa chỉ: {order_buyer.order_address}</li>
                        </ul>
                    </div>
                    <div className=''>
                      <p className='font-semibold'>Đơn hàng gồm</p>
                      <ul className='h-20 p-2 overflow-y-auto border rounded-lg'>
                      {
                        order_details.map((item,index)=>(
                          <li key={index} className='flex flex-row gap-3'>
                            <p>Mã sách:{item._id}<span> Số lượng:{item.quantity}</span></p>
                            <p>Giá: {item.unit_price}</p>
                          </li>
                        ))
                        
                      }
                      </ul>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default HoverOrderInfo