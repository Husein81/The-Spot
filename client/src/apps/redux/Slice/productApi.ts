import { PaginatedProduct } from "../../models/PagenatedModels/PagenatedProducts";
import { Product } from "../../models/Product";
import { PRODUCTS_URL } from "../URLs";
import { apiSlice } from "./apiSlice";

interface GetProductsParams {
    isAdmin?: boolean,
    page?: number,
    searchTerm?: string
}

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<PaginatedProduct, GetProductsParams>({
            query: ({ page, isAdmin, searchTerm}: GetProductsParams) => ({
                url: PRODUCTS_URL,
                params: {
                    page,
                    isAdmin,
                    searchTerm
                }
            }),
            providesTags: ["Product"],
            keepUnusedDataFor: 5,// cache results in 5 sec
        }),
        getProduct: builder.query<Product, string>({
            query: (id: string) => ({
                url: `${PRODUCTS_URL}/${id}`
            }),
            providesTags: ["Product"],
            keepUnusedDataFor: 5,
        }),
        createProduct: builder.mutation<Product, Product>({
            query: (product: Product) => ({
                url: PRODUCTS_URL,
                method:"POST",
                body: product
            }),
        }),
        updateProduct: builder.mutation<Product, Product>({
            query: (product: Product) => ({
                url: `${PRODUCTS_URL}/${product._id}`,
                method: 'PUT',
                body: product
            }),
        }),
        deleteProduct: builder.mutation({
            query: (productId: string) => ({
                url:`${PRODUCTS_URL}/${productId}`,
                method:"DELETE",
            }),
            invalidatesTags: ["Product"]
        })
    })
});


export const {
    useGetProductsQuery,
    useGetProductQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation
} = productApiSlice;