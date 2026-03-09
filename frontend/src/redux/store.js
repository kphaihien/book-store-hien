import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "./features/cart/cartSlice"
import booksApi from './features/books/bookApi'
import ordersApi from './features/orders/orderApi'
import categoryApi from './features/categories/categoryApi'
import usersApi from './features/users/usersApi'
import authApi from './features/auth/authApi'
import statsApi from './features/stats/statsApi'


export const store = configureStore({
    reducer: {
        cart:cartReducer,
        [booksApi.reducerPath]:booksApi.reducer,
        [ordersApi.reducerPath]:ordersApi.reducer,
        [categoryApi.reducerPath]:categoryApi.reducer,
        [usersApi.reducerPath]:usersApi.reducer,
        [authApi.reducerPath]:authApi.reducer,
        [statsApi.reducerPath]:statsApi.reducer
    },

    middleware: getDefaultMiddleware =>
                getDefaultMiddleware()
            .concat(booksApi.middleware, ordersApi.middleware, categoryApi.middleware, usersApi.middleware,authApi.middleware,statsApi.middleware)
})