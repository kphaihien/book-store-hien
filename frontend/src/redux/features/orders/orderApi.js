import { createApi, fetchBaseQuery }from "@reduxjs/toolkit/query/react";
import  getBaseUrl  from "../../../utils/baseUrl";



const ordersApi=createApi({
    reducerPath:"ordersApi",
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseUrl()}/api/orders`,
        credentials:"include",
        prepareHeaders: (Headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                Headers.set('Authorization', `Bearer ${token}`)
            }
            return Headers;
        }
    }),
    tagTypes:["Orders"],
    endpoints:(builders)=>({
        createOrder:builders.mutation({
            query:(newOrder)=>({
                url:"/create-order",
                body:newOrder,
                method:"POST",
                credentials:"include"
            }),
            invalidatesTags:["Orders"]
        }),
        searchOrders:builders.query({
            query:({q})=>({
                url:`/search/${q}`,
                method:"GET"
            }),
            invalidatesTags:["Orders"]
        }),
        fetchOrdersByUserId: builders.query({
            query: (currentUserId) => ({
                url: `/get-orders-by-user-id/${currentUserId}`,
                method:"GET",
            }),
            providesTags:["Orders"]
        }),
 
    })
})

export const {useCreateOrderMutation,useFetchOrdersByUserIdQuery,useSearchOrdersQuery}=ordersApi
export default ordersApi