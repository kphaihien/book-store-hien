import { createApi, fetchBaseQuery }from "@reduxjs/toolkit/query/react";
import  getBaseUrl  from "../../../utils/baseUrl";



const statsApi=createApi({
    reducerPath:"statsApi",
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseUrl()}/api/stats`,
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
        getDashboardStats: builders.query({
            query: ({ period }) => ({
                url: `/dashboard-stats?period=${period}`,
                method: "GET",
            }),
        })
    })
})

export const {useGetDashboardStatsQuery}=statsApi
export default statsApi