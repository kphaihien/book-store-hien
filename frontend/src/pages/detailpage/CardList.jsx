import React from 'react'

import getBaseUrl from '../../utils/baseUrl';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';

import StarRating from '../../components/StarRating'

const CardList = ({book}) => {
    const dispatch=useDispatch()
    const handleAddToCart=(item)=>{
        dispatch(addToCart(item))
    }
  return (
    <>
        <div className='p-5 bg-white rounded-lg w-70 '>
            <div className='flex flex-row justify-around border border-gray-300 rounded-md'>
                <img className='object-contain p-2 h-70' src={`${getBaseUrl()}/public/${book?.book_img}`}/>
            </div>
            
                <div className='flex flex-col justify-center gap-1 mt-2'>
                    {book.new_price&&
                        <div className='flex flex-row items-center row-span-1 gap-2 col-span-full'>
                            <p className='text-xl font-bold text-red-500'>{book.new_price}đ</p>
                            <div className='px-1 bg-gray-200 rounded-md'>-{(100 - (book.new_price / book.old_price) * 100).toFixed(0)}%</div>
                            <p className='text-lg font-bold line-through'>{book?.old_price}đ</p>
                        </div>
                    }
                    {!book.new_price && <div className='flex items-center row-span-1 gap-2 col-span-full'>
                        <p className='text-lg font-bold text-red-500'>{book?.old_price}đ</p>
                    </div>}
                    <p className='row-span-1 mt-2 text-gray-400 uppercase col-span-full'>
                        {book.author}
                    </p>
                    <h2 className='h-12 text-lg'>
                        {book.book_name?book.book_name:"Tên của sách"}
                    </h2>
                    <div className='flex flex-row items-center row-span-1 gap-2 col-span-full'>
                        <StarRating numberStar={book.review_star}/>
                        <p className='text-gray-400'>| Đã bán {book?.sold_quantity}</p>
                    </div>
                
                    <button className='w-1/2 px-4 py-1 font-semibold text-white transition transform bg-yellow-400 border border-black rounded-lg :bg-purple-500 hover:scale-105 hover:cursor-pointer h-14 place-self-center' onClick={()=>handleAddToCart({book,counter:1})}>Thêm vào giỏ hàng</button>
                </div>
        </div>
    </>
  )
}

export default CardList