import { Pagination } from "../../models/pagination/Pagintation";
import { ProductPagination } from "../../models/pagination/ProductPagination";
import { Product } from "../../models/Product";
import { PRODUCT_URL } from "../URL";
import { apiSlice } from "./apiSlice";

type Prop = { page: number; pageSize: number; category: string };
const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductPagination, Pagination>({
      query: ({ page, pageSize, searchTerm, sort, order }) => ({
        url: PRODUCT_URL,
        params: {
          page,
          pageSize,
          searchTerm,
          sort,
          order,
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
    getProductByCategory: builder.query<ProductPagination, Prop>({
      query: ({ page, pageSize, category }) => ({
        url: `${PRODUCT_URL}/category/${category}`,
        params: {
          page,
          pageSize,
        },
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetProductByCategoryQuery,
} = productApi;
