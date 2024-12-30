import { Pagination } from "../models/Pagination/pagination";
import { api } from "./api";
import { useQuery } from "@tanstack/react-query";

const orderURL = "/order/";
export const useGetOrders = (pagination: Pagination) => {
  return useQuery({
    queryKey: ["orders", pagination],
    queryFn: async () => {
      const response = await api.get(orderURL, {
        params: pagination,
      });
      return response.data;
    },
  });
};
