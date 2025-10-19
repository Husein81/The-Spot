import { Pagination, ProductType } from "@repo/types";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const productApi = {
  getProducts: async ({
    category,
    sort,
    search,
    params,
  }: {
    category: string;
    sort?: string;
    search?: string;
    params: "homepage" | "products";
  }): Promise<Pagination<ProductType>> => {
    try {
      const response = await api.get("/products", {
        params: {
          category,
          sort,
          search,
          params,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return { data: [], totalPages: 0, totalCount: 0, currentPage: 0 }; // fallback
    }
  },
};
