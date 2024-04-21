import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSilce";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,
});

export type RooteState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;