import { Pagination } from "../../models/pagination/Pagintation";
import { ProductPagination } from "../../models/pagination/ProductPagination";
import { Product } from "../../models/Product";
import { PRODUCT_URL } from "../URL";
import { apiSlice } from "./apiSlice";

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductPagination, Pagination>({
      query: ({ page, pageSize, searchTerm, sort }) => ({
        url: PRODUCT_URL,
        params: {
          page,
          pageSize,
          searchTerm,
          sort,
        },
        method: "GET",
      }),
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productApi;
