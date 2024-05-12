import { Category } from "../../models/Category";
import { PagenatedCategory } from "../../models/PagenatedModels/PagenatedCategory";
import { CATEGORY_URL } from "../URLs";
import { apiSlice } from "./apiSilce";

export interface CategoryParam{
    pageNumber?:number
}
export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<PagenatedCategory, CategoryParam>({
            query: ( pageNumber: CategoryParam) => ({
                url: CATEGORY_URL,
                params:{
                    pageNumber:pageNumber,
                }
            }),
            providesTags: ["Category"],
            keepUnusedDataFor: 5,
        }),
        createCategory: builder.mutation<Category, Category>({
            query: (cat: Category) => ({
                url:CATEGORY_URL,
                method: "POST",
                body: cat,
            }),
        }),
        updateCategory: builder.mutation({
            query: (cat: Category) => ({
                url:`${CATEGORY_URL}/${cat._id}`,
                method: "PUT",
                body: cat,
            }),
        }),
        deleteCategory: builder.mutation({
            query: (cat: Category) => ({
                url:`${CATEGORY_URL}/${cat._id}`,
                method: "DELETE",
            }),
        })
    })
})
export const {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categoryApiSlice;