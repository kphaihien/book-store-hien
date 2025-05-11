import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import { getImgUrl } from '../../utils/getImgUrl';

import { FaStar } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import useScrollToTopOnMount from '../../utils/useScrollToTopOnMount';
import { useFetchBookByIdQuery } from '../../redux/features/books/bookApi';
import getBaseUrl from '../../utils/baseUrl';
import StarRating from '../../components/StarRating';
import beautyVND from '../../utils/beautyVND';

const SingleBook = () => {
  useScrollToTopOnMount();
  const dispatch=useDispatch()
  const handleAddToCart=(product)=>{
    dispatch(addToCart(product))
  }
  
  const {id}=useParams();
  const {data:book=[],isLoading,isError}=useFetchBookByIdQuery(id);
  
  const [productCounter,setProductCounter]=useState(1)

  if(isLoading)return <div>Đang tải ....</div>
  if(isError) return <div>Đã có lỗi xảy ra vui lòng thử lại</div>
  

  const numberStar=4.3;
  return (
    <>
      <div className='flex h-full bg-gray-100 max-w-screen-2xl'>
        <div className='flex items-center justify-center w-1/4 p-4 m-4 bg-white rounded-md h-80'>
          <img className='object-contain w-full h-full border border-gray-200 rounded-md ' src={`${getBaseUrl()}/public/${book?.book_img}`} />
        </div>

        {/*phần thông tin chính*/ }
        <div className='flex  flex-col w-2/4 gap-2 p-4 h-[3000px]'>
          <div className='p-4 bg-white rounded-md'>
            <h2 className='text-3xl font-bold'>{book.book_name}</h2>
            <div className='flex flex-row items-center gap-1'>
              {book.review_star&&(<>
                  <p>{book.review_star}</p>
                  <StarRating numberStar={book.review_star}/>
                </>)
                ||<p>Chưa có đánh giá </p>
              }
              <div className='text-gray-500'>
                | Đã bán {book.sold_quantity}
              </div>
            </div>
            <div className='flex flex-row items-center gap-4 mt-2'>
              <div className='text-2xl font-bold text-red-500'>{beautyVND(book.new_price||book.old_price)}</div>

              {
                book.new_price &&(<>
                  <p className='text-sm border border-gray-400 rounded-lg'>-{(100-(book.new_price/book.old_price)*100).toFixed(0)}%</p>
                  <p className='text-2xl line-through'>{beautyVND(book.old_price)}</p></>)
              }
            </div>
          </div>
          <div className='p-4 bg-white rounded-md'>
           <p>{book?.book_descriptions||"Sản phẩm chưa có miêu tả"}</p>
          </div>
        </div>
        
        {/*phần mua hàng nhanh*/}
        <div className='sticky flex flex-col justify-start w-1/4 gap-4 p-4 px-6 m-4 bg-white rounded-md max-h-100'>
          <div className='text-2xl font-bold'>{book.vendor ? book.vendor :"Nhà cung cấp"}</div>
          <hr className='text-gray-400'/>
          <div className='flex flex-col gap-2'>
            <p className='font-bold'>Số lượng</p>
            <div className='flex flex-row items-center gap-1'>
              <button disabled={productCounter===1} onClick={() => setProductCounter(productCounter - 1)} className={`flex items-center justify-center w-8 h-8 border border-gray-400 rounded-lg cursor-pointer `}>-</button>
              <div className='flex items-center justify-center w-10 h-8 text-center border border-gray-500 rounded-lg'>{productCounter}</div>
              <div onClick={()=>setProductCounter(productCounter+1)} className='flex items-center justify-center w-8 h-8 border border-gray-400 rounded-lg cursor-pointer'>+</div>
            </div>
          </div>
          <div className='flex flex-col gap-2 '>
            <p className='text-xl font-bold'>Tạm tính</p>
            <p className='text-3xl font-bold text-red-500'>{book.new_price ? beautyVND((book.new_price * productCounter).toFixed(0)) : beautyVND((book.old_price * productCounter).toFixed(0))}</p>
          </div>

          <div>
            <button onClick={()=>handleAddToCart({book,counter:productCounter})} className='w-full p-2 px-4 text-white transition transform bg-yellow-400 rounded-md cursor-pointer text-md hover:scale-105'>
              Thêm vào giỏ
            </button>
          </div>    
        </div>

        
      </div>
    </>
  )
}

export default SingleBook