import { createSlice } from '@reduxjs/toolkit'
import Swal from 'sweetalert2'

const initialState={
    cartItems:[],
    totalPrice:0//tổng giá phải trả
}

const cartSlice=createSlice({
    name:'cart',
    initialState:initialState,
    reducers:{
        addToCart:(state,action)=>{
            // const existingItem=state.cartItems.find(item=>item._id===action.payload._id)
            const itemIndex = state.cartItems.findIndex(item => item.book._id === action.payload.book._id);
            
            if(itemIndex==-1){
                state.cartItems.push({book:action.payload.book,quantity:action.payload.counter})
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Đã thêm vào giỏ hàng",
                    showConfirmButton: false,
                    timer: 1500
                });
            }else{
                state.cartItems[itemIndex].quantity+=1;
                Swal.fire({
                position: "center",
                icon: "success",
                title: "Đã thêm vào giỏ hàng",
                showConfirmButton: false,
                timer: 1500
                }) 
            }
            state.totalPrice = state.cartItems.reduce((total, item) => {
                const price = item.book.new_price ? item.book.new_price : item.book.old_price;
                return total + price * item.quantity;
            }, 0);
        },
        increaseQuantity:(state,action)=>{
            const itemIndex = state.cartItems.findIndex(item => item.book._id === action.payload._id);
            if(itemIndex!==-1){
                state.cartItems[itemIndex].quantity += 1;

                state.totalPrice = state.cartItems.reduce((total, item) => {
                const price = item.book.new_price ? item.book.new_price : item.book.old_price;
                return total + price * item.quantity;
            }, 0)}
        },
        decreaseQuantity:(state,action)=>{
            const itemIndex = state.cartItems.findIndex(item => item.book._id === action.payload._id);
            if (itemIndex !== -1) {
                state.cartItems[itemIndex].quantity -= 1;

                state.totalPrice = state.cartItems.reduce((total, item) => {
                    const price = item.book.new_price ? item.book.new_price : item.book.old_price;
                    return total + price * item.quantity;
                }, 0)
            }
        },
        // updateQuantity: (state, action) => {
        //     const { bookId, quantity } = action.payload;
        //     const itemIndex = state.cartItems.findIndex(
        //         (item) => item.book._id === bookId
        //     );
        //     if (itemIndex !== -1 && quantity > 0) {
        //         state.cartItems[itemIndex].quantity = quantity;
        //     } else if (itemIndex !== -1 && quantity === 0) {
        //         state.cartItems.splice(itemIndex, 1); // Xóa nếu số lượng bằng 0
        //     }
        // },
        removeFromCart:(state,action)=>{
            state.cartItems=state.cartItems.filter(item=>item.book._id!==action.payload._id)
            
            state.totalPrice = state.cartItems.reduce((total, item) => {
                const price = item.book.new_price ? item.book.new_price : item.book.old_price;
                return total + price * item.quantity;
            }, 0);
        },
        clearCart:(state)=>{
            state.cartItems=[]
            state.totalPrice=0;
        },
    }
})
//export the actions
export const {addToCart,removeFromCart,clearCart,increaseQuantity,decreaseQuantity}=cartSlice.actions




export const selectCartQuantity=(state)=>state.cart.cartItems.length


export default cartSlice.reducer