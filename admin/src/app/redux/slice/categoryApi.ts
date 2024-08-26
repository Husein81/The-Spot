import { CATEGORY_URL } from "../URL";
import { apiSlice } from "./apiSlice";

const categoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => ({
                url:CATEGORY_URL,
                method: "GET",
            }),
        }),
        createCategory: builder.mutation({
            query: (body) => ({
                url:CATEGORY_URL,
                method: "POST",
                body,
            }),
        }),
        updateCategory: builder.mutation({
            query: (body) => ({
                url:CATEGORY_URL,
                method: "PUT",
                body,
            }),
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url:CATEGORY_URL+"/"+id,
                method: "DELETE",
            }),
        }),
    }),
});

export const { 
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
} = categoryApi;