import { ORDER_URL } from "../URL";
import { apiSlice } from "./apiSlice";

const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: ({ page, pageSize, searchTerm }) => ({
        url: ORDER_URL,
        method: "GET",
        params: {
          page,
          pageSize,
          searchTerm,
        },
      }),
    }),
    createOrder: builder.mutation({
      query: (order) => ({
        url: `orders`,
        method: "POST",
        body: order,
      }),
    }),
  }),
});

export const { useGetOrdersQuery, useCreateOrderMutation } = orderApi;
