import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cartItem } from "../../models/cart";

interface cartState {
    cart: cartItem[];
}

const initialState: cartState = {
    cart: JSON.parse(localStorage.getItem('cart') || '[]'),
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<cartItem>) => {
            const existingItem = state.cart.find((item) => item._id === action.payload._id);
            if(existingItem){
                existingItem.quantity += 1;
            }else{
                state.cart.push(action.payload);
            }
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cart = state.cart.filter((item) => item._id !== action.payload);
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        updateQuantity: (state, action: PayloadAction<{ _id: string; quantity: number }>) => {
            const item = state.cart.find(item => item._id === action.payload._id);
            if (item) {
              item.quantity = action.payload.quantity;
            }
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        setCart:(state, action: PayloadAction<cartItem[]>)=> {
            state.cart = action.payload;
            localStorage.setItem('cart', JSON.stringify(state.cart));
        }
      
    }
});

export const {
    addToCart,
    removeFromCart,
    updateQuantity,
    setCart
} = cartSlice.actions;  
export default cartSlice.reducer;