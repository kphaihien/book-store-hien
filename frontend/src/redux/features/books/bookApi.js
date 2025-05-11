import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseUrl'

const baseQuery=fetchBaseQuery({
    baseUrl:`${getBaseUrl()}/api/books`,
    credentials:"include",
    prepareHeaders:(Headers)=>{
        const token=localStorage.getItem('token');
        if (token){
            Headers.set('Authorization',`Bearer ${token}`)
        }
        return Headers;
    }
})

const booksApi=createApi({
    reducerPath:"booksApi",
    baseQuery,
    tagTypes:["Books"],
    endpoints:(builders)=>({
        fetchAllBooks:builders.query({
            query:()=>"/",
            providesTags:["Books"]
        }),
        fetchBooksPage:builders.query({
            query:({page,limit,category_id})=>({
                url:`/paginatied?page=${page}&limit=${limit}&category_id=${category_id}`,
                method:"GET",
            })
        }),
        searchBooksByName:builders.query({
            query:({q,page,limit})=>({
                url: `/search?q=${q}&page=${page}&limit=${limit}`,
                method:"GET"
            })
        }),
        fetchTopSellerBooks:builders.query({
            query:()=>({
                url:'/top-sellers',
                method:"GET",
            })
        }),
        fetchBookById:builders.query({
            query:(id)=>`/${id}`,
            providesTags:(result,error,id)=>[{type:"Books",id}],
        }),
        addBook:builders.mutation({
            query:(newBook)=>({
                url:`/create-book`,
                method:"POST",
                body:newBook,
            }),
            invalidatesTags:["Books"] //sau khi addBook sẽ xem sự thay đổi của cache, nếu có tahy đổi sẽ xóa cache cũ fetchAllbooks và refresh lại cache mới.
        }),
        updateBook:builders.mutation({
            query:({id,...rest})=>({
                url:`/edit/${id}`,
                method:"PUT",
                body:rest,
                headers:{
                    "Content-Type":"application/json"
                },
            }),
            invalidatesTags:["Books"]
        }),
        deleteBook:builders.mutation({
            query:(id)=>({
                url:`delete/${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["Books"]
        })
    })
})

export const {useFetchAllBooksQuery,useFetchBookByIdQuery,useAddBookMutation,useUpdateBookMutation,
    useDeleteBookMutation,useFetchBooksPageQuery,useFetchTopSellerBooksQuery,useSearchBooksByNameQuery}=booksApi
export default booksApi