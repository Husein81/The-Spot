import { productApi } from "@/lib/apis/productApi";
import { ProductType } from "@repo/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetProducts = (
  params: {
    category: string;
    sort?: string;
    search?: string;
    params: "homepage" | "products";
  },
  initialData: ProductType[]
): UseQueryResult<{
  data: ProductType[];
  totalPages: number;
  totalCount: number;
  currentPage: number;
}> =>
  useQuery({
    queryKey: ["products"],
    queryFn: () => productApi.getProducts(params),
    initialData: {
      data: initialData,
      totalPages: 1,
      totalCount: initialData.length,
      currentPage: 1,
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true, // Refetch when tab regains focus
    refetchOnReconnect: true, // Refetch when network reconnects
    refetchOnMount: true, // Refetch when component mounts
    retry: 3, // Retry failed requests 3 times
  });
