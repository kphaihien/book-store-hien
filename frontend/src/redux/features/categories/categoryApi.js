import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseUrl'

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/category`,
    credentials: "include",
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            Headers.set('Authorization', `Bearer ${token}`)
        }
        return Headers;
    }
})

const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery,
    tagTypes: ["Category"],
    endpoints: (builders) => ({
        fetchAllCategory: builders.query({
            query: () => "/",
            providesTags: ["Category"]
        }),
        // fetchCategoryById: builders.query({
        //     query: (id) => `/${id}`,
        //     providesTags: (result, error, id) => [{ type: "Books", id }],
        // }),
        // addBook: builders.mutation({
        //     query: (newBook) => ({
        //         url: `/create-book`,
        //         method: "POST",
        //         body: newBook,
        //     }),
        //     invalidatesTags: ["Books"] //sau khi addBook sẽ xem sự thay đổi của cache, nếu có tahy đổi sẽ xóa cache cũ fetchAllbooks và refresh lại cache mới.
        // }),
        // updateBook: builders.mutation({
        //     query: ({ id, ...rest }) => ({
        //         url: `/edit/${id}`,
        //         method: "PUT",
        //         body: rest,
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //     }),
        //     invalidatesTags: ["Books"]
        // }),
        // deleteBook: builders.mutation({
        //     query: (id) => ({
        //         url: `delete/${id}`,
        //         method: "DELETE"
        //     }),
        //     invalidatesTags: ["Books"]
        // })
    })
})

export const { useFetchAllCategoryQuery } = categoryApi
export default categoryApi