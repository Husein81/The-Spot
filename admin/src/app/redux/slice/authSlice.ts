import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../model/User";

type AuthState = {
    user: User | null;
}

const initialState: AuthState = {
    user: localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user') as string) : null,
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: { 
        logout: (state) =>{
            state.user = null
            localStorage.removeItem('user')
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
        }
    },
});

export const { 
    logout, 
    setUser
} = authSlice.actions;
export default authSlice.reducer;