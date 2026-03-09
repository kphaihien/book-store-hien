

import React, { useState } from 'react'
import { Card, Button, Tag, Typography, Rate, Space, Badge, Tooltip } from 'antd'
import { ShoppingCartOutlined, HeartOutlined, HeartFilled, EyeOutlined } from '@ant-design/icons'

import getBaseUrl from '../../utils/baseUrl';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../redux/features/cart/cartSlice';
import StarRating from '../../components/StarRating'

const { Text, Title } = Typography

const CardList = ({ book }) => {

    const [wishlist, setWishlist] = useState(false)
    const [addedToCart, setAddedToCart] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleNavigateSingleBook = () => {
        navigate(`/books/${book?._id}`)
    }
    const handleAddToCart = (item) => {
        dispatch(addToCart(item))
        setAddedToCart(true)
        setTimeout(() => setAddedToCart(false), 1500)
    }

    const discountPercent = book?.new_price
        ? (100 - (book.new_price / book.old_price) * 100).toFixed(0)
        : null

    return (
        <Badge.Ribbon
            text={discountPercent ? `-${discountPercent}%` : null}
            color="red"
            style={{ display: discountPercent ? 'block' : 'none', fontWeight: 700, fontSize: 13 }}
        >
            <Card
                hoverable
                style={{
                    width: 240,
                    borderRadius: 16,
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    border: '1px solid #f0f0f0',
                    transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                }}
                bodyStyle={{ padding: '14px 16px 16px' }}
                styles={{ body: { padding: '14px 16px 16px' } }}
                cover={
                    <div
                        style={{
                            position: 'relative',
                            background: 'linear-gradient(135deg, #fdf6ec 0%, #fef3e2 100%)',
                            height: 220,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                        }}
                    >
                        <img
                            alt={book?.book_name}
                            src={`${getBaseUrl()}/public/${book?.book_img}`}

                            style={{
                                height: 180,
                                objectFit: 'contain',
                                transition: 'transform 0.35s ease',
                                filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.18))',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.07)')}
                            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                        />

                        {/* Wishlist button */}
                        <Tooltip title={wishlist ? 'Bỏ yêu thích' : 'Yêu thích'}>
                            <Button
                                type="text"
                                shape="circle"
                                icon={
                                    wishlist
                                        ? <HeartFilled style={{ color: '#ff4d4f', fontSize: 18 }} />
                                        : <HeartOutlined style={{ color: '#999', fontSize: 18 }} />
                                }
                                onClick={() => setWishlist(!wishlist)}
                                style={{
                                    position: 'absolute',
                                    top: 10,
                                    left: 10,
                                    background: 'rgba(255,255,255,0.85)',
                                    backdropFilter: 'blur(4px)',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                }}
                            />
                        </Tooltip>
                    </div>
                }
            >
                {/* Author */}
                <Text
                    type="secondary"
                    style={{
                        fontSize: 11,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        fontWeight: 600,
                    }}
                >
                    {book?.author || 'Tác giả'}
                </Text>

                {/* Book name */}
                <Title
                    onClick={handleNavigateSingleBook}
                    level={5}
                    ellipsis={{ rows: 2 }}
                    style={{
                        margin: '4px 0 8px',
                        fontSize: 14,
                        lineHeight: '1.4',
                        minHeight: 40,
                        fontFamily: "'Be Vietnam Pro', sans-serif",
                    }}
                >
                    {book?.book_name || 'Tên sách'}
                </Title>

                {/* Rating & Sold */}
                <Space align="center" style={{ marginBottom: 10 }}>
                    <Rate
                        disabled
                        allowHalf
                        defaultValue={book?.review_star || 0}
                        style={{ fontSize: 12, color: '#faad14' }}
                    />
                    <Text type="secondary" style={{ fontSize: 12 }}>
                        Đã bán{' '}
                        <Text strong style={{ color: '#333', fontSize: 12 }}>
                            {book?.sold_quantity?.toLocaleString() || 0}
                        </Text>
                    </Text>
                </Space>

                {/* Price */}
                <div style={{ marginBottom: 14 }}>
                    {book?.new_price ? (
                        <Space align="baseline" wrap>
                            <Text
                                strong
                                style={{ fontSize: 20, color: '#e53935', lineHeight: 1 }}
                            >
                                {book.new_price.toLocaleString()}đ
                            </Text>
                            <Text
                                delete
                                type="secondary"
                                style={{ fontSize: 13 }}
                            >
                                {book.old_price?.toLocaleString()}đ
                            </Text>
                        </Space>
                    ) : (
                        <Text strong style={{ fontSize: 20, color: '#e53935' }}>
                            {book?.old_price?.toLocaleString()}đ
                        </Text>
                    )}
                </div>

                {/* Add to cart button */}
                <Button
                    color='primary'
                    variant="solid"
                    icon={<ShoppingCartOutlined />}
                    block
                    size="middle"
                   onClick={()=>handleAddToCart({book,counter:1})}
                    style={{
                        borderRadius: 10,
                        height: 42,
                        fontWeight: 700,
                        fontSize: 14,
                        boxShadow: addedToCart
                            ? '0 4px 12px rgba(82,196,26,0.4)'
                            : '0 4px 12px rgba(240,90,40,0.35)',
                        transition: 'all 0.3s ease',
                        letterSpacing: '0.02em',
                    }}
                >
                    {addedToCart ? '✓ Đã thêm!' : 'Thêm vào giỏ hàng'}
                </Button>
            </Card>
        </Badge.Ribbon>
    )
}

export default CardList