import { CategoriesPagination } from "../../models/pagination/CaregoriesPagination";
import { Pagination } from "../../models/pagination/Pagintation";
import { CATEGORY_URL } from "../URL";
import { apiSlice } from "./apiSlice";

const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<CategoriesPagination, Pagination>({
      query: ({ page, pageSize, searchTerm }) => ({
        url: CATEGORY_URL,
        method: "GET",
        params: { page, pageSize, searchTerm },
      }),
    }),
    createCategory: builder.mutation({
      query: (body) => ({
        url: CATEGORY_URL,
        method: "POST",
        body,
      }),
    }),
    updateCategory: builder.mutation({
      query: (body) => ({
        url: CATEGORY_URL + "/" + body._id,
        method: "PUT",
        body,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: CATEGORY_URL + "/" + id,
        method: "DELETE",
      }),
    }),
    getCategory: builder.query({
      query: (id) => ({
        url: CATEGORY_URL + "/" + id,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useDeleteCategoryMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;
