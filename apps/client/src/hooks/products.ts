import { productApi } from "@/lib/apis/productApi";
import { ProductType, type Pagination } from "@repo/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetProducts = ({
  searchParams,
  initialData,
}: {
  searchParams: {
    page?: string;
    limit?: string;
    category: string;
    sort?: string;
    search?: string;
    params: "homepage" | "products";
  };
  initialData: Pagination<ProductType>;
}): UseQueryResult<Pagination<ProductType>, Error> => {
  return useQuery({
    queryKey: ["products", searchParams],
    queryFn: () => productApi.getProducts(searchParams),
    initialData:
      !searchParams.page || searchParams.page === "1" ? initialData : undefined,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false, // Don't refetch when tab regains focus
    refetchOnReconnect: true, // Refetch when network reconnects
    refetchOnMount: false, // Don't refetch when component mounts if we have data
    retry: 3, // Retry failed requests 3 times
  });
};
