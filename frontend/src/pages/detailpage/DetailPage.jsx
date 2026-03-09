import React, { useState } from 'react'
import CardList from './CardList'
import { Pagination, Card, Typography, Radio, Button, Divider } from "antd"
import { FilterOutlined, ClearOutlined } from '@ant-design/icons'
import { ImFileEmpty } from "react-icons/im";
import { useFetchBooksPageQuery } from '../../redux/features/books/bookApi';
import { useFetchAllCategoryQuery } from '../../redux/features/categories/categoryApi';
import Loading from '../../components/Loading';

const { Title, Text } = Typography

const DetailPage = () => {
    const { data: rawCategories = [] } = useFetchAllCategoryQuery()
    const categories = rawCategories?.data

    const [chosenCategory, setChosenCategory] = useState("")
    const [page, setPage] = useState(1)

    const { data, isLoading } = useFetchBooksPageQuery({
        page: page,
        limit: 6,
        category_id: chosenCategory
    })

    const totalPages = data?.totalPages
    const books = data?.books

    const handleChangePage = (newPage) => {
        setPage(newPage)
    }

    const handleRemoveFilter = () => {
        setChosenCategory("")
    }

    if (isLoading) { return <Loading /> }

    return (
        <>
            {!isLoading && (
                <div className='flex flex-col w-full h-full gap-7'>
                    <div className='flex flex-row gap-7'>

                        <Card
                            className='flex flex-col items-start justify-between w-1/5 h-full rounded-lg'
                        >
                            <div className='flex items-center gap-2 mb-3'>
                                <FilterOutlined style={{ fontSize: 16, color: '#f05a28' }} />
                                <Title level={4} style={{ margin: 0 }}>Bộ lọc</Title>
                            </div>

                            <Text
                                type="secondary"
                                style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}
                            >
                                Thể loại
                            </Text>

                            <Radio.Group
                                value={chosenCategory}
                                onChange={(e) => setChosenCategory(e.target.value)}
                                style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}
                            >
                                {categories?.map((cate, index) => (
                                    <Radio key={index} value={cate._id}>
                                        {cate.category_name}
                                    </Radio>
                                ))}
                            </Radio.Group>


                            <Button
                                className='mt-4'
                                variant='outlined'
                                icon={<ClearOutlined />}
                                onClick={handleRemoveFilter}
                                disabled={!chosenCategory}
                                block
                            >
                                Xóa bộ lọc
                            </Button>
                        </Card>

                        {(books !== null && books?.length > 0)
                            ? (
                                <div className='flex flex-row flex-wrap w-3/4 h-full gap-4 ml-auto rounded-lg'>
                                    {books?.map((book, index) => (
                                        <CardList key={index} book={book} />
                                    ))}
                                </div>
                            )
                            : (
                                <div className='flex flex-col items-center justify-center w-3/4 h-full gap-5 mt-20'>
                                    <ImFileEmpty className='opacity-50 w-50 h-50' />
                                    <p className='text-lg opacity-50'>Không có sách thuộc thể loại này</p>
                                </div>
                            )
                        }
                    </div>

                    {books?.length > 0 && (
                        <div className='flex justify-center'>
                            <Pagination
                                size='large'
                                current={page}
                                total={totalPages * 6}
                                pageSize={6}
                                onChange={handleChangePage}
                                showSizeChanger={false}
                            />
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default DetailPage