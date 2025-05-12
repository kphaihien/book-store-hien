import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseUrl'

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/auth`,
    credentials: "include",

})

const authApi = createApi({
    reducerPath: "authApi",
    baseQuery,
    tagTypes: ["Auth"],
    endpoints: (builders) => ({
        registerNewUser: builders.mutation({
            query: (newUser) => ({
                url: `/user/register`,
                method: "POST",
                body: newUser,
            }),
        }),
        loginUser: builders.mutation({
            query: (data) => ({
                url: `/login`,
                method: "POST",
                body: data
            }),
            
        }),
    })
})

export const { useRegisterNewUserMutation, useLoginUserMutation } = authApi
export default authApi