import React, { useEffect, useState } from 'react'
import { data, Link, useSearchParams } from 'react-router-dom';
import { useSearchBooksByNameQuery } from '../../redux/features/books/bookApi';
import useScrollToTopOnMount from '../../utils/useScrollToTopOnMount';

import Loading from '../../components/Loading'
import CardList from '../detailpage/CardList';
import ReactPaginate from 'react-paginate';

const BooksSearchPage = () => {
    useScrollToTopOnMount();
    const [searchParams] = useSearchParams();
    const [page,setPage]=useState(1)
    const query = searchParams.get('q') || '';

    const { data,isLoading } = useSearchBooksByNameQuery({
        q:query,
        page:page,
        limit:8
        }, {
        skip: !query,
    });
    const books=data?.books||[]
    const totalPages=data?.totalPages

    const handleChangePage=({selected})=>{
        setPage(selected+1)
    }

    if(isLoading){return (<Loading/>)}

    return (
        <>
        <div className='flex flex-col gap-4'>
            <h2>Kết quả tìm kiếm cho: "<span className='font-bold'>{query}</span>"</h2>
            <div className='grid grid-cols-4 gap-9'>
                {books.length>0&&
                        books.map((book,index)=>(<Link to=""><CardList key={index} book={book}/></Link>))
                }
            </div>
            {books.length>8&&<ReactPaginate
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
                                    containerClassName="flex flex-row gap-3 justify-center items-center pt-24"
                                    pageLinkClassName={`rounded-lg w-10 h-10 flex items-center justify-center border border-black transition transform px-3  py-1 cursor-pointer hover:bg-yellow-400 hover:font-bold  hover:text-white`}
                                    activeClassName="rounded-lg font-bold bg-yellow-400 text-white"
                                />}
            </div>
    </>);
};

export default BooksSearchPage