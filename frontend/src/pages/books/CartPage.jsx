import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getImgUrl } from '../../utils/getImgUrl';
import { addToCart, clearCart, decreaseQuantity, increaseQuantity, removeFromCart,  } from '../../redux/features/cart/cartSlice';



import { MdDelete } from "react-icons/md";
import { CiShoppingCart, CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import useScrollToTopOnMount from '../../utils/useScrollToTopOnMount';
import { useFetchAllCategoryQuery } from '../../redux/features/categories/categoryApi';
import getBaseUrl from '../../utils/baseUrl';
import beautyVND from '../../utils/beautyVND';
import Loading from '../../components/Loading';


const CartPage = () => {
  useScrollToTopOnMount();
  const navigate=useNavigate()
  const {data:rawData,isLoading}=useFetchAllCategoryQuery()
  const cartItems= useSelector(state=>state.cart.cartItems);
  const categories=rawData?.data
  const isCheckOutDisabled=!cartItems||cartItems.length===0
  const dispatch=useDispatch()
  const totalPrice=useSelector(state=>state.cart.totalPrice)
  const handleNavigateCheckOut=()=>{
    if(!isCheckOutDisabled){
      navigate("/checkout")
    }
  }
  const handleDecreaseToCart=(product)=>{
    dispatch(decreaseQuantity(product))
  }
  const handleIncreaseQuantity=(product)=>{
    dispatch(increaseQuantity(product))
  }
  
  const handleRemoveFromCart=(product)=>{
    dispatch(removeFromCart(product))
  }
  const handleClearCart=()=>dispatch(clearCart())

  if(isLoading){return <Loading/>}
  return (
    <>
      <div className="flex flex-col h-full mt-12 overflow-hidden bg-white shadow-xl">
        <div className="flex-1 px-4 py-6 overflow-y-auto sm:px-6">
          <div className="flex items-start justify-between">
            <div className="text-lg font-medium text-gray-900">Giỏ hàng</div>
            <div className="flex items-center ml-3 h-7 ">
              <button
              onClick={()=>handleClearCart()}
                type="button"
                className={`relative flex items-center px-2 py-1 -m-2 text-black transition-all duration-200 transform 
                   border rounded-md cursor-pointer text- hover:bg-red-600 hover:scale-105 hover:text-white ${cartItems?.length>0?"bg-red-400":"bg-white"}`}
              >
                <MdDelete size="16" />
                <span className="">Làm sạch giỏ hàng</span>
              </button>
            </div>
          </div>

          <div className="mt-8">
            <div className="flow-root">

               {
                cartItems?.length > 0 ? (
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {
                      cartItems.map((product,index) => (
                        <li key={index} className="flex py-6">
                          <div className="flex-shrink-0 overflow-hidden border border-gray-200 rounded-md w-30 h-30">
                            <img
                              alt=""
                              src={`${getBaseUrl()}/public/${product?.book?.book_img}`}
                              className="object-contain w-full h-full"
                            />
                          </div>

                          <div className="flex flex-col flex-1 ml-4">
                            <div>
                              <div className="flex flex-wrap justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <Link to='/'>{product.book.book_name}</Link>
                                </h3>
                                {product.book.new_price ? <p className="sm:ml-4">{beautyVND(product.book.new_price)}</p> : <p className="sm:ml-4">{beautyVND(product.book.old_price)}</p>}
                              </div>
                              {
                                !isLoading && <p className="mt-1 text-sm text-gray-500 capitalize"><strong>Thể loại:{categories.find((cate) => cate._id === product.book.category_id)?.category_name||" Chưa có"}</strong></p>
                              }
                              
                            </div>
                            <div className="flex flex-wrap items-end justify-between flex-1 space-y-2 text-sm">
                              <div className="text-gray-500">
                                <div className='flex flex-row items-center justify-center gap-1'>
                                  <strong>Số lượng:</strong>
                                  <button onClick={()=>handleDecreaseToCart(product.book)}  className={` ${product.quantity>1?`transition transform cursor-pointer hover:scale-110`:` opacity-45`}`} disabled={product.quantity<2}><CiSquareMinus size="30" /></button>
                                  <p className='px-2 border border-gray-500 rounded-md '> {product.quantity}</p>
                                  <button onClick={() => handleIncreaseQuantity(product.book)}  className='transition transform cursor-pointer hover:scale-110'><CiSquarePlus size="30" /></button>
                                </div>
                             </div>

                              <div className="flex">
                                <button 
                                  onClick={()=>handleRemoveFromCart(product.book)}
                                  type="button" className="font-medium text-indigo-600 cursor-pointer hover:text-indigo-500">
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))
                    }



                  </ul>
                ) : 
                  (<div>
                    <div className='flex flex-col items-center justify-center gap-5'>
                      <CiShoppingCart className='text-gray-400' size="150" />
                      <p className='text-gray-400'>Giỏ hàng trống</p>
                    </div>
                  </div>
                  )
              } 


            </div>
          </div>
        </div>

        <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Tiền tạm tính</p>
            <p>{totalPrice?beautyVND(totalPrice):"0đ"}</p>
          </div>
          <p className="mt-0.5 mb-1 text-sm text-gray-500">Phí giao hàng sẽ được tính ở phần thanh toán</p>
            <button onClick={handleNavigateCheckOut} className={`flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white border border-transparent rounded-md shadow-sm cursor-pointer ${isCheckOutDisabled?`bg-gray-200 `:"bg-blue-600 hover:bg-blue-700"}`} disabled={isCheckOutDisabled}>
                Thanh toán
            </button>
          <div className="flex justify-center mt-6 text-sm text-center text-gray-500">
            <Link to="/">
              or
              <button
                type="button"

                className="ml-1 font-medium text-indigo-600 cursor-pointer hover:text-indigo-500"
              >
                Tiếp tục mua sắm
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default CartPage