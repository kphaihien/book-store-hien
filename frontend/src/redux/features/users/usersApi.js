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
        // registerNewUser:builders.mutation({
        //     query:(newUser)=>({
        //         url:`/user/register`,
        //         method:"POST",
        //         invalidatesTags:["Users"],
        //         body:newUser,
        //     }),
        // }),
        // loginUserWithUserName:builders.mutation({
        //     query:(data)=>({
        //         url:`/login`,
        //         method:"POST",
        //         providesTags:["Users"],
        //         body:data
        //     }),
        // }),
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
            invalidatesTags:["User"]
        })
    })
})

export const { useGetAllUsersQuery,useUpdateUserProfileMutation} = usersApi
export default usersApi