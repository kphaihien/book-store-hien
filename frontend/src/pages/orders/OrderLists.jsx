import React from 'react'
import { useFetchOrdersByUserIdQuery } from '../../redux/features/orders/orderApi'
import { useAuth } from '../../context/AuthContext'
import Loading from '../../components/Loading'
import getBaseUrl from '../../utils/baseUrl'

import { PiNoteBlankDuotone } from "react-icons/pi";
import { FaBox } from "react-icons/fa";


import OrderStatus from '../../components/OrderStatus'
const OrderLists = () => {
    const {currentUser}=useAuth()
    const {data,isLoading}=useFetchOrdersByUserIdQuery(currentUser.id);
    const orders=data?.orders

    
    
    
  if (isLoading) {
    return <Loading/>
  }
    
  return (
    <>
        <div className='flex flex-col gap-3'>
            <div className='flex flex-row items-center justify-start gap-3'>
              <h1 className='text-4xl font-bold '>Đơn hàng của tôi</h1>
              <FaBox className="mt-2 w-7 h-7"/>
            </div>
            <div className='flex flex-col w-full gap-5 rounded-lg'>
                {
                  orders&&orders.map((item,index)=>(
                    <div className='grid w-full grid-cols-2 p-3 px-4 bg-white rounded-lg shadow-xl h-46'>
                      <div>
                        <h2 className='text-xl font-bold '>Đơn hàng thứ {index+1}</h2>
                        <div className='overflow-y-auto h-35'>
                          {item?.order_details.map((product,index)=>(
                            <>
                              <div className='flex flex-row items-center h-12 gap-3 pb-2'>
                                <img  className='w-10 h-10' src={`${getBaseUrl()}/public/${product.book_img}`}/>
                                <p className='text-lg font-semibold'>{product.book_name}</p>
                                <p>Số lượng:{product.quantity}</p>
                              </div>
                            </>
                          ))}
                        </div>
                      </div>
           
                      <div className='flex flex-col col-start-2 ml-2'>
                        <p className='text-lg font-semibold'>
                          Tổng tiền cần thanh toán: {item.order_total_cost} VND
                        </p>
                        <div className='flex flex-row gap-2 text-lg'>
                          Loại thanh toán: {item.payment_type==="cash"?(<p>Thanh toán sau khi nhận hàng</p>):(<p>Chuyển khoản trước</p>)}
                        </div>
                        <div>
                          <p>Trạng thái đơn hàng: </p>
                          {
                            <OrderStatus status={item?.order_status}/>
                          }
                        </div>
                      </div>
                    </div>
                  ))
                }
                {
                  !orders&&(<div className='flex flex-col items-center justify-center h-screen'>
                    <PiNoteBlankDuotone className='opacity-40 h-45 w-45'/>
                    <p className='text-lg text-gray-400'>Chưa có đơn hàng nào</p>
                  </div>)
                }
            </div>
        </div>
    </>
  )
}

export default OrderLists