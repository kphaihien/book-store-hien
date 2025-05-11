import React from 'react'
import { FiShoppingCart } from "react-icons/fi";
import { getImgUrl } from "../../utils/getImgUrl"
import { Link } from 'react-router-dom';

import {useDispatch} from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice';
import getBaseUrl from '../../utils/baseUrl';
import beautyVND from '../../utils/beautyVND';



const BookCard = ({ book }) => {
    const dispatch=useDispatch()

    const handleAddtoCart=(product)=>{ 
        dispatch(addToCart(product))
    }

    return (
        <>
            <div className="transition-shadow duration-300 rounded-lg ">
                <div
                    className="flex flex-col gap-4 sm:flex-row sm:items-center sm:h-72 sm:justify-center"
                >
                    <div className="flex items-center justify-center border border-gray-400 rounded-md sm:h-68 sm:flex-shrink-0">
                        <Link to={`/books/${book._id}`} >
                            <img
                                src={`${getBaseUrl()}/public/${book?.book_img}`}
                                alt=""
                                className="object-contain max-w-full max-h-full p-2 transition-all duration-200 bg-cover rounded-md cursor-pointer w-45 hover:scale-105"
                            />
                        </Link>
                    </div>

                    <div className='flex flex-col justify-start gap-1'>
                        <Link to={`/books/${book._id}`}
                        ><h3 className="w-4/5 h-12 mb-4 text-xl font-semibold hover:text-blue-600">
                                {book.book_name}
                            </h3></Link>
                        
                        <p className="h-20 pt-4 mb-5 text-gray-600 w-44 max-h-20">{book?.book_descriptions?.length > 60 ? `${book?.book_descriptions.slice(0, 60)}...` : book.book_descriptions}</p>
        
                        

                        {
                            book.new_price ? <p className="h-5 mb-5 text-lg font-medium text-red-600">
                                {beautyVND(book.new_price)} <span className="ml-2 font-normal text-black line-through">{beautyVND(book.old_price)}</span>
                            </p>:
                                <p className="mb-5 text-lg font-medium text-red-600 ">
                                    {beautyVND(book.old_price)}
                                </p>
                            
                        }
                        <button onClick={() => handleAddtoCart({book,counter:1})} className="flex items-center w-4/5 gap-1 px-6 py-1 space-x-1 transition transform bg-yellow-400 rounded-md h-13 max-h-13 justify-self-end hover:scale-105 hover:bg-purple-700 hover:font-bold hover:text-yellow-500">
                            <FiShoppingCart size="20" />
                            <span className=' text-md'>Thêm vào giỏ hàng</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookCard