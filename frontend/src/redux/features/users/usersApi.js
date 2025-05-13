import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseUrl'

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/users`,
    credentials: "include",
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            Headers.set('Authorization', `Bearer ${token}`)
        }
        return Headers;
    }
})

const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery,
    tagTypes: ["Users"],
    endpoints: (builders) => ({
        getAllUsers:builders.query({
            query:()=>({
                url:`/`,
                providesTags: ["Users"]
            }),
        }),
        updateUserProfile:builders.mutation({
            query:(newInfo)=>({
                url:"/update-profile",
                method:"POST",
                body:newInfo
            }),
            invalidatesTags:["Users"]
        }),
        deleteUserWithId:builders.mutation({
            query:(id)=>({
                url:`/delete/${id}`,
                method:"DELETE",
            }),
            invalidatesTags:["Users"]
        }),
        searchUser:builders.query({
            query:({q})=>({
                url:`/search/?q=${q}`,
                method:"GET"
            }),
            providesTags:["Users"]
        }),
    })
})

export const { useGetAllUsersQuery,useUpdateUserProfileMutation,useDeleteUserWithIdMutation,useSearchUserQuery} = usersApi
export default usersApi