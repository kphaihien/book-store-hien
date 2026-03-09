import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'
import { useFetchBookByIdQuery } from '../../redux/features/books/bookApi'
import useScrollToTopOnMount from '../../utils/useScrollToTopOnMount'
import getBaseUrl from '../../utils/baseUrl'
import StarRating from '../../components/StarRating'
import beautyVND from '../../utils/beautyVND'

import {
  Button, Divider, InputNumber, Tag, Skeleton, Alert, Typography, Badge
} from 'antd'
import {
  ShoppingCartOutlined, ShopOutlined, TagOutlined, FireOutlined
} from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

const SingleBook = () => {
  useScrollToTopOnMount()
  const dispatch = useDispatch()
  const { id } = useParams()
  const { data: book = [], isLoading, isError } = useFetchBookByIdQuery(id)
  const [productCounter, setProductCounter] = useState(1)

  const handleAddToCart = () => {
    dispatch(addToCart({ book, counter: productCounter }))
  }

  if (isLoading) return (
    <div className='max-w-6xl p-8 mx-auto'>
      <Skeleton active avatar={{ size: 200, shape: 'square' }} paragraph={{ rows: 8 }} />
    </div>
  )

  if (isError) return (
    <div className='max-w-6xl p-8 mx-auto'>
      <Alert message="Đã có lỗi xảy ra, vui lòng thử lại" type="error" showIcon />
    </div>
  )

  const discountPercent = book.new_price
    ? (100 - (book.new_price / book.old_price) * 100).toFixed(0)
    : null

  const finalPrice = book.new_price || book.old_price
  const totalPrice = (finalPrice * productCounter).toFixed(0)

  return (
    <div className='min-h-screen px-4 py-8 bg-gray-50'>
      <div className='flex flex-col max-w-6xl gap-5 mx-auto lg:flex-row'>

        {/* ── Ảnh sách ── */}
        <div className='lg:w-1/4'>
          <div className='sticky flex items-center justify-center p-5 bg-white shadow-sm rounded-2xl top-6'
            style={{ minHeight: 320 }}>
            <img
              src={`${getBaseUrl()}/public/${book?.book_img}`}
              alt={book.book_name}
              className='object-contain w-full rounded-lg'
              style={{
                maxHeight: 300,
                filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.15))',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>
        </div>

        {/* ── Thông tin chính ── */}
        <div className='flex flex-col gap-4 lg:w-2/4'>

          {/* Tên & đánh giá */}
          <div className='p-6 bg-white shadow-sm rounded-2xl'>
            <Title level={3} style={{ marginBottom: 8 }}>{book.book_name}</Title>

            <div className='flex flex-row flex-wrap items-center gap-2'>
              {book.review_star ? (
                <>
                  <Text strong style={{ color: '#f59e0b', fontSize: 16 }}>{book.review_star}</Text>
                  <StarRating numberStar={book.review_star} />
                </>
              ) : (
                <Text type="secondary">Chưa có đánh giá</Text>
              )}
              <Text type="secondary">| Đã bán <Text strong>{book.sold_quantity}</Text></Text>
            </div>

            <Divider style={{ margin: '16px 0' }} />

            {/* Giá */}
            <div className='flex flex-row flex-wrap items-center gap-3'>
              <Text strong style={{ fontSize: 28, color: '#e53935' }}>
                {beautyVND(finalPrice)}
              </Text>
              {discountPercent && (
                <>
                  <Tag color="red" icon={<TagOutlined />} style={{ fontSize: 13, padding: '2px 8px' }}>
                    -{discountPercent}%
                  </Tag>
                  <Text delete type="secondary" style={{ fontSize: 16 }}>
                    {beautyVND(book.old_price)}
                  </Text>
                </>
              )}
              {discountPercent && (
                <Tag color="orange" icon={<FireOutlined />} style={{ fontSize: 12 }}>
                  Đang giảm giá
                </Tag>
              )}
            </div>
          </div>

          {/* Mô tả */}
          <div className='p-6 bg-white shadow-sm rounded-2xl'>
            <Title level={5} style={{ marginBottom: 12 }}>Mô tả sản phẩm</Title>
            <Paragraph
              ellipsis={{ rows: 6, expandable: true, symbol: 'Xem thêm' }}
              style={{ color: '#555', lineHeight: 1.8 }}
            >
              {book?.book_descriptions || 'Sản phẩm chưa có mô tả'}
            </Paragraph>
          </div>
        </div>

        {/* ── Mua hàng nhanh ── */}
        <div className='lg:w-1/4'>
          <div className='sticky flex flex-col gap-4 p-6 bg-white shadow-sm rounded-2xl top-6'>

            {/* Vendor */}
            <div className='flex items-center gap-2'>
              <ShopOutlined style={{ fontSize: 18, color: '#f05a28' }} />
              <Text strong style={{ fontSize: 16 }}>
                {book.vendor || 'Nhà cung cấp'}
              </Text>
            </div>

            <Divider style={{ margin: '0' }} />

            {/* Số lượng */}
            <div className='flex flex-col gap-2'>
              <Text strong>Số lượng</Text>
              <InputNumber
                min={1}
                value={productCounter}
                onChange={(val) => setProductCounter(val || 1)}
                style={{ width: '100%', borderRadius: 8, height: 40 }}
                size='large'
              />
            </div>

            <Divider style={{ margin: '0' }} />

            {/* Tạm tính */}
            <div className='flex flex-col gap-1'>
              <Text type="secondary">Tạm tính</Text>
              <Text strong style={{ fontSize: 26, color: '#e53935' }}>
                {beautyVND(totalPrice)}
              </Text>
            </div>

            {/* Nút thêm giỏ */}
            <Button
              type='primary'
              size='large'
              icon={<ShoppingCartOutlined />}
              onClick={handleAddToCart}
              block
              className='h-48 rounded-lg shadow-2xl'
            >
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SingleBook