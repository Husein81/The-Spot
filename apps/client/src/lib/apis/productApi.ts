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
    page,
    limit,
    category,
    sort,
    search,
    params,
  }: {
    page?: string;
    limit?: string;
    category: string;
    sort?: string;
    search?: string;
    params: "homepage" | "products";
  }): Promise<Pagination<ProductType>> => {
    try {
      const response = await api.get("/products", {
        params: {
          page,
          limit,
          category,
          sort,
          search,
          params,
        },
      });
      console.log("res", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch products", error as Error);
    }
  },
};
