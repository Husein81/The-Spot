/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/User";

interface AuthState {
  user: User | null;
}
const initialState: AuthState = {
  user: null,
};

const loadUserAction = async () => {
  const user = localStorage.getItem("user");
  if (user) {
    return (await JSON.parse(user)) as User;
  }
  return null;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { loginUser, setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;

export const loadUser = () => async (dispatch: any) => {
  const user = loadUserAction();
  dispatch(setUser(user as never));
};
