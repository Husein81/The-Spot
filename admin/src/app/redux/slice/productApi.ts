import { Pagination } from "../../model/pagination/Pagintation";
import { ProductPagination } from "../../model/pagination/ProductPagination";
import { Product, ProductInput } from "../../model/Product";
import { PRODUCT_URL } from "../URL";
import {apiSlice} from "./apiSlice";

const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<ProductPagination ,Pagination>({
            query: ({page, pageSize, searchTerm}) => ({
                url: PRODUCT_URL,
                method: "GET",
                params: { 
                    page, 
                    pageSize, 
                    searchTerm 
                },
            }),
            providesTags: ["Product"],
            keepUnusedDataFor: 5,
        }),
        getProduct: builder.query<Product, string>({
            query: (id) => ({
                url: `${PRODUCT_URL}/${id}`,
                method: "GET",
            }),
        }),
        createProduct: builder.mutation<Product, ProductInput>({
            query: (product) => ({
                url: PRODUCT_URL,
                method: "POST",
                body: product,
            }),
        }),
        updateProduct: builder.mutation({
            query: (body) => ({
                url: `${PRODUCT_URL}/${body._id}`,
                method: "PUT",
                body,
            }),
        }),
        deleteProduct: builder.mutation<Product, string>({
            query: (id) => ({
                url: `${PRODUCT_URL}/${id}`,
                method: "DELETE",
            }),
        }),

    })
});

export const { 
    useGetProductsQuery,
    useGetProductQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation, 
} = productApi;