import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import modalReducer from "./slice/modalSlice";
import {apiSlice} from "./slice/apiSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        modal: modalReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


