import React from 'react'
import CardList from '../detailpage/CardList'
import { Carousel, Typography, Spin, Alert } from 'antd'
import { FireOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import { useFetchTopSellerBooksQuery } from '../../redux/features/books/bookApi'

const { Title } = Typography

const TopSellers = () => {
    const { data = [], isLoading, isError } = useFetchTopSellerBooksQuery()
    const books = data?.books

    if (isError) {
        return <Alert message="Xảy ra lỗi" type="error" showIcon style={{ margin: '20px 0' }} />
    }

    // Chia books thành các nhóm 3 (mỗi slide hiện 3 cuốn)
    const chunkBooks = (arr = [], size = 3) => {
        const result = []
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size))
        }
        return result
    }

    const bookGroups = chunkBooks(books, 3)

    return (
        <div className='py-10'>
            <div className='flex items-center gap-2 mb-6'>
                <FireOutlined style={{ fontSize: 24, color: '#f05a28' }} />
                <Title level={3} style={{ margin: 0 }}>Top bán chạy</Title>
            </div>

            {isLoading ? (
                <div className='flex items-center justify-center h-60'>
                    <Spin size='large' />
                </div>
            ) : (
                <Carousel
                className='w-full'
                    autoplay
                    autoplaySpeed={2500}
                    arrows
                    prevArrow={
                        <div>
                            <LeftOutlined style={{ color: '#333', fontSize: 18 }} />
                        </div>
                    }
                    nextArrow={
                        <div>
                            <RightOutlined style={{ color: '#333', fontSize: 18 }} />
                        </div>
                    }
                    dots={{ className: 'custom-dots' }}
                >
                    {bookGroups.map((group, groupIndex) => (
                        <div key={groupIndex}>
                            <div 
                            className='flex flex-row justify-center px-40 py-8 gap-15'>
                                {group.map((book, index) => (
                                    <CardList key={index} book={book} />
                                ))}
                            </div>
                        </div>
                    ))}
                </Carousel>
            )}
        </div>
    )
}

export default TopSellers