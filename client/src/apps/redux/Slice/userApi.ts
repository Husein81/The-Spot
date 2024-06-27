/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "../../models/User";
import { AUTH_URL, USER_URL, USERPROFILE_URL } from "../URLs";
import { apiSlice } from "./apiSlice";


interface LogoutResponse {
    success: boolean;
    message: string;
  }
export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<User, User>({
            query: (data: User) => ({
                url:`${AUTH_URL}/login`,
                method: "POST",
                body: data
            })
        }),
        register: builder.mutation<User, User>({
            query: (data: User) => ({
                url: `${AUTH_URL}/register`,
                method:"POST",
                body: data
            }),
        }),
        logoutApiCall: builder.mutation<LogoutResponse, void>({
            query: () => ({
                url: `${AUTH_URL}/logout`,
                method:"POST",
            })
        }),
        getUserProfile: builder.query<User, string>({
            query: (id: string) => ({
                url: `${USERPROFILE_URL}/${id}`
            }),
            providesTags: ["User"],
            keepUnusedDataFor: 5,
        }),
        updateUserProfile: builder.mutation<User, User>({
            query: (user: User) => ({
                url: `${USER_URL}/${user._id}`,
                method: "PUT",
                body: user
            })
        }),
        
    })
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutApiCallMutation,
    useGetUserProfileQuery, 
} = userApi;