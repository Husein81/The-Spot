/* eslint-disable @typescript-eslint/no-explicit-any */
import { PagenatedUser } from "../../models/PagenatedModels/PagenatedUser";
import { User } from "../../models/User";
import { AUTH_URL, USER_URL } from "../URLs";
import { apiSlice } from "./apiSilce";


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
        getUsers: builder.query<PagenatedUser, number>({
            query: (pageNumber: number ) => ({
                url: USER_URL,
                params: {
                    pageNumber
                }
            }),
            providesTags: ["User"],
            keepUnusedDataFor: 5
        }),
        getUser: builder.query<User, string>({
            query: (id: string) => ({
                url: `${USER_URL}/${id}`
            }),
            providesTags: ["User"],
            keepUnusedDataFor: 5,
        }),
        updateUser: builder.mutation<User, User>({
            query: (user: User) => ({
                url: `${USER_URL}/${user._id}`,
                method: "PUT",
                body: user
            })
        }),
        deleteUser: builder.mutation<User, string>({
            query: (id: string) => ({
                url: `${USER_URL}/${id}`,
                method: "DELETE"
            })
        })
        
    })
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutApiCallMutation,
    useGetUsersQuery,
    useGetUserQuery
} = userApi;