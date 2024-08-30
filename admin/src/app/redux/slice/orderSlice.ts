import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderItem } from "../../model/OrderItem";

const initialState = localStorage.getItem('cart') 
    ? JSON.parse(localStorage.getItem('cart') as string) 
    : {orderItems:[]}

const orderSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart: (state, action: PayloadAction<OrderItem>) => {
            const item = action.payload;
            const existItem = state.orderItems.find((x: OrderItem) => x.product._id === item.product._id);
            if(existItem){
                if (item.quantity <= 0) {
                    state.orderItems = state.orderItems.filter((x: OrderItem) => x.product._id !== item.product._id);
                  } else {
                    state.orderItems = state.orderItems.map((x: OrderItem) =>
                      x.product._id === existItem.product._id ? item : x
                    );
                  }
            }else{
                state.cart = [...state.cart, item];
            }
        }
    }
})

export default orderSlice.reducer;