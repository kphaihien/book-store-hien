import React, { useEffect, useState } from 'react'
import CardList from './CardList'
import ReactPaginate from "react-paginate"
import { ImFileEmpty } from "react-icons/im";
import { RiFilterOffLine } from "react-icons/ri";
import { useFetchBooksPageQuery } from '../../redux/features/books/bookApi';
import { useFetchAllCategoryQuery } from '../../redux/features/categories/categoryApi';
import Loading from '../../components/Loading';


const DetailPage = () => {
    const {data:rawCategories=[]}=useFetchAllCategoryQuery()
    const categories=rawCategories?.data
    

    const [filteredBooks, setFilteredBooks] = useState([])
    const [chosenCategory, setChosenCategory] = useState("")

    const [page,setPage]=useState(1)
    const {data,isLoading}=useFetchBooksPageQuery({
        page:page,
        limit:6,
        category_id:chosenCategory
    })
    
    const totalPages=data?.totalPages
    const books=data?.books
    
    const handleChangePage=({selected})=>{
        setPage(selected+1)
    }
    const handleRemoveFilter=()=>{
        setChosenCategory("")
    }

    if (isLoading) { return <Loading /> }
    return (
        <>  
            {!isLoading&&(
            <div className='flex flex-col w-full h-full gap-7'>
                <div className='w-full p-4 text-3xl font-bold bg-white rounded-lg'>
                    Nhà sách thế giới
                </div>
                
                <div className='flex flex-row gap-7'>
                    {/*filter book*/}
                    <div className='flex flex-col gap-10'>
                        <div>
                            <div className='flex p-8 '>
                                <div className='flex flex-col gap-3'>
                                    <p className='text-2xl font-bold'>Bộ lọc</p>

                                    {
                                        categories?.map((cate,index)=>(
                                            <div key={index} className='flex items-center justify-start'>
                                                <input checked={chosenCategory===cate._id} value={cate._id} onChange={(e)=>setChosenCategory(e.target.value)} name="category" id={cate._id} type="radio" className="w-4 h-4 bg-gray-100 border-gray-300 rounded-sm dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor={index} className="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300">{cate.category_name}</label>
                                            </div>
                                        ))
                                    }
                                    <RiFilterOffLine onClick={handleRemoveFilter} className='transition transform cursor-pointer h-7 w-7 hover:scale-110'/>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*list book*/}
                    {books?.length>0?(<div className='flex flex-row flex-wrap w-3/4 h-full gap-4 ml-auto rounded-lg'>
                        {
                           books?.map((book,index)=>(
                                <CardList key={index} book={book}/>
                            ))
                        }
                    </div>)
                    :(<div className='flex flex-col items-center justify-center w-3/4 h-full gap-5 mt-20'>
                        <ImFileEmpty className='opacity-50 w-50 h-50' />
                        <p className='text-lg opacity-50'>Không có sách thuộc thể loại này</p>
                    </div>)}
                    
                    

                </div>
                <div>
                    
                </div>
                {books?.length>0&&<div className=''>
                    <ReactPaginate
                        breakLabel="..."
                        // initialPage={0}
                        breakClassName='w-10 h-10 flex items-center justify-center border border-black transition transform px-3  py-1 cursor-pointer hover:bg-yellow-400 hover:font-bold  hover:text-white'
                        nextLabel=">"
                        onPageChange={handleChangePage}
                        pageRangeDisplayed={1}
                        marginPagesDisplayed={2}
                        pageCount={totalPages}
                        forcePage={page-1}
                        previousClassName='font-bold text-2xl cursor-pointer hover:underline'
                        nextClassName='font-bold text-2xl cursor-pointer hover:underline'
                        previousLabel="<"
                        containerClassName="flex flex-row gap-3 justify-center items-center "
                        pageLinkClassName={`rounded-lg w-10 h-10 flex items-center justify-center border border-black transition transform px-3  py-1 cursor-pointer hover:bg-yellow-400 hover:font-bold  hover:text-white`}
                        activeClassName="rounded-lg font-bold bg-yellow-400 text-white"
                    />
                </div>}
            </div>)}
        </>
    )
}

export default DetailPage