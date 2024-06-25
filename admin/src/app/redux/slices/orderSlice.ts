import { Order } from "../../models/Order";
import { ORDER_URL } from "../URLs";
import { apiSlice } from "./apiSilce";

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query<Order[], void>({
            query: () => ({
                url: ORDER_URL,
            }),
            providesTags: ["Order"],
            keepUnusedDataFor: 5
        }),
        getOrder: builder.query<Order, string>({
            query: (id: string) => ({
                url: `${ORDER_URL}/${id}`
            }),
            providesTags: ["Order"],
            keepUnusedDataFor: 5
        }),
        updateOrderStatus: builder.mutation<Order, {orderId: string, status: boolean}>({
            query: ({orderId, status}) => ({
                url: `${ORDER_URL}/${orderId}`,
                method: 'PUT',
                body: {status}
            }),
            invalidatesTags: ["Order"]
        })
    })
});
