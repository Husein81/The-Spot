import { Product } from "../../models/Product";
import { PRODUCTS_URL } from "../URLs";
import { apiSlice } from "./apiSilce";

interface GetProductsParams {
    isAdmin?: boolean,
    pageNumber?: number
}

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        getProducts: builder.query({
            query: ({ pageNumber, isAdmin}: GetProductsParams) => ({
                url: PRODUCTS_URL,
                params: {
                    pageNumber,
                    isAdmin
                }
            }),
            providesTags: ["Product"],
            keepUnusedDataFor: 5,// cache results in 5 sec
        }),
        getProduct: builder.query({
            query: (id: string) => ({
                url: `${PRODUCTS_URL}/${id}`
            }),
            providesTags: ["Product"],
            keepUnusedDataFor: 5,
        }),
        createProduct: builder.mutation({
            query: (body: Product) => ({
                url: PRODUCTS_URL,
                method:"POST",
                body,
            }),
            invalidatesTags: ["Product"]
        }),
        updateProduct: builder.mutation({
            query: (product: Product) => ({
                url: `${PRODUCTS_URL}/${product._id}`,
                method: 'PUT',
                body: product
            }),
        }),
    })
});


export const {
    useGetProductsQuery,
} = productApiSlice;