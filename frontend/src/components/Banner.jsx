import React from 'react'
import imgBanner from "../assets/imgBanner.png"
import { Link } from 'react-router-dom'

const Banner = () => {
  return (
    <>
        <div className='flex flex-col items-center justify-between gap-12 py-16 md:flex-row-reverse'>
              <div className='flex flex-row items-center w-full md:w-1/2 md:justify-end'>
                  <img src={imgBanner}></img>
              </div>
            
            <div className='w-full md:w-1/2'>
                <h1 className='text-2xl font-medium mb-7 md:text-5xl'>Mới nhất tuần này</h1>
                  <p className='mb-10'>Nhà sách Thế Giới hân hạnh giới thiệu bộ sưu tập sách mới đầy hấp dẫn, 
                    đáp ứng mọi sở thích của độc giả! Từ những cuốn tiểu thuyết lãng mạn cuốn hút, sách kinh doanh truyền cảm 
                    hứng, đến các tác phẩm kinh dị đầy kịch tính, mỗi cuốn sách đều được chọn lọc kỹ lưỡng để mang đến trải 
                    nghiệm đọc tuyệt vời. Đừng bỏ lỡ cơ hội khám phá những câu chuyện mới mẻ và kiến thức sâu sắc, sẵn sàng 
                    chờ bạn tại kệ sách của chúng tôi!</p>
                <Link to="/detail-page"><button className='px-8 py-2 font-bold text-white transition transform bg-yellow-400 rounded-md cursor-pointer hover:scale-105'>
                    Xem thêm
                </button></Link>
            </div >

        </div >
    </>
  )
}

export default Banner