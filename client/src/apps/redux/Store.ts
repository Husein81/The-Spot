import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./Slice/apiSlice";
import cartReducer from "./Slice/cartSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,
});

store.dispatch({
    type:'cart/setCart',
    payload: JSON.parse(localStorage.getItem('cart') || '[]')
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;