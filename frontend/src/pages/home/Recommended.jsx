import React, { useEffect, useState } from 'react'
import BookCard from "../books/BookCard"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../redux/features/books/bookApi';



const Recommended = () => {
    const {data:books=[]}=useFetchAllBooksQuery();

    
    return (
        <>
            <div className='py-16'>
                <h2 className='mb-6 text-3xl font-semibold'>Dành cho bạn</h2>

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
                    modules={[Pagination, Navigation,Autoplay]}
                    autoplay={{ delay: 2000 }}
                    className="mySwiper"
                >

                    {
                        books.length > 0 && books.slice(8,18).map((book, index) => (
                            <SwiperSlide key={index}>
                                <BookCard book={book} />
                            </SwiperSlide>
                        ))
                    }

                </Swiper>

            </div>
        </>
  )
}

export default Recommended