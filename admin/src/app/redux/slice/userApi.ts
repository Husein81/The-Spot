import { Login, Register, User } from "../../model/User";
import { LOGIN_URL, REGISTER_URL } from "../URL";
import { apiSlice } from "./apiSlice";

const useApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login:builder.mutation<User, Login>({
            query:(body: Login) => ({
                url: LOGIN_URL,
                method: 'POST',
                body
            })
        }),
        register:builder.mutation<User, Register>({
            query:(body: Register) => ({
                url: REGISTER_URL,
                method: 'POST',
                body
            })
        })
    }),
});

export const { 
    useLoginMutation,
    useRegisterMutation
} = useApi;