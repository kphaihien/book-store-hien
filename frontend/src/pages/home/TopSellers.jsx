import React, { useEffect, useState } from 'react'
import BookCard from '../books/BookCard'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useFetchTopSellerBooksQuery } from '../../redux/features/books/bookApi';




const TopSellers = () => {
    const {data=[],isLoading}=useFetchTopSellerBooksQuery();
    const books=data?.books
    
  return (
    <>
        <div className='py-10'>
            <h2 className='mb-6 text-3xl font-semibold'>Top bán chạy</h2>
            {/* <div className='flex items-center mb-8'>
                <select onChange={(e)=>setSelectedCategory(e.target.value)} name="category" id="category" className='px-4 py-2 bg-gray-300 border rounded-md focus:outline-none'>
                    {
                        categories.map((cate,index)=>(
                            <option value={cate} key={index}>{cate}</option>
                        ))
                    }
                </select>
            </div> */}
            {!isLoading&&

              <Swiper
                  slidesPerView={1}
                  spaceBetween={30}
                  navigation={true}
                  breakpoints={{
                      640: {
                          slidesPerView: 2,
                          spaceBetween: 20,
                      },
                      768: {
                          slidesPerView: 2,
                          spaceBetween: 40,
                      },
                      1024: {
                          slidesPerView: 2,
                          spaceBetween: 50,
                      },
                       1180: {
                          slidesPerView: 3,
                          spaceBetween: 50,
                      },
                  }}
                  modules={[Pagination,Navigation,Autoplay]}
                  autoplay={{delay:2000}}
                  className="mySwiper"
              >
    
                    {
                      books.length>0 &&books.map((book, index) => (
                        <SwiperSlide key={index}>
                          <BookCard  book={book} />
                        </SwiperSlide>
                      ))
                    }
                  
              </Swiper>
            }
        </div>
    </>
  )
}

export default TopSellers