import { Pagination } from "../models/Pagination/pagination";
import { Category } from "../models/Category";
import { api } from "./api";
import { useQuery } from "@tanstack/react-query";

const categoryURL = "/category/";

export const useGetCategories = (pagination: Pagination) => {
  return useQuery({
    queryKey: ["categories", pagination],
    queryFn: async () => {
      const response = await api.get(categoryURL, {
        params: pagination,
      });
      return response.data;
    },
  });
};

export const useGetCategory = (id: string) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: async () => {
      const response = await api.get<Category>(categoryURL + id);
      return response.data;
    },
  });
};

export const createCategory = async (category: Category) => {
  try {
    const response = await api.post(categoryURL, category);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateCategory = async (category: Category) => {
  try {
    const response = await api.put(categoryURL + category._id, category);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategory = async (id: string) => {
  try {
    await api.delete(categoryURL + id);
  } catch (error) {
    console.log(error);
  }
};
