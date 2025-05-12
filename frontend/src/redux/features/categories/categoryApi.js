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
    })
})

export const { useFetchAllCategoryQuery } = categoryApi
export default categoryApi