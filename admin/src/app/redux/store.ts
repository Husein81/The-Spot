import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slice/authSlice";
import modalSliceReducer from "./slice/modalSlice";
export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    modal: modalSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: true, // Disable if issues with non-serializable values
    }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
