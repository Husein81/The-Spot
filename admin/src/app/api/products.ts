import { Pagination } from "../models/Pagination/pagination";
import { ProductPagination } from "../models/Pagination/product";
import { Product } from "../models/Product";
import { api } from "./api";
import { useQuery } from "@tanstack/react-query";

const productURL = "/product/";

export const useGetAllProducts = (pagination: Pagination) => {
  return useQuery({
    queryKey: ["products", pagination],
    queryFn: async () => {
      const response = await api.get<ProductPagination>(productURL, {
        params: pagination,
      });
      return response.data;
    },
  });
};

export const createProduct = async (product: Product) => {
  try {
    const response = await api.post(productURL, product);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error as never);
  }
};

export const updateProduct = async (product: Product) => {
  try {
    const response = await api.put(productURL + product._id, product);
    return response.data;
  } catch (error) {
    throw new Error(error as never);
  }
};

export const useGetProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await api.get<Product>(productURL + id);
      return response.data;
    },
  });
};

export const deleteProduct = async (id: string) => {
  try {
    await api.delete(productURL + id);
  } catch (error) {
    console.log(error);
  }
};
