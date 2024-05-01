/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from '../URLs';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL}),
    tagTypes: ["Product", "User", "Category", "Order"],
    endpoints: (_builder) => ({}),
});