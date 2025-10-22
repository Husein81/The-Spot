"use client";
import { useGetProducts } from "@/hooks/products";
import type { Pagination as PaginationType, ProductType } from "@repo/types";
import { Button } from "@repo/ui";
import { useRouter } from "next/navigation";
import SkeletonList from "../SkeletonList";
import ProductCard from "./ProductCard";
import Filter from "../Filter";
import Pagination from "../Pagination";

type Props = {
  initialData: PaginationType<ProductType>;
  searchParams: {
    page?: string;
    limit?: string;
    category: string;
    sort?: string;
    search?: string;
    params: "homepage" | "products";
  };
};

const ProductListClient = ({ initialData, searchParams }: Props) => {
  const router = useRouter();
  const { data: productsPaginated, isLoading } = useGetProducts({
    searchParams,
    initialData,
  });

  return (
    <div className="flex flex-col gap-6">
      {searchParams.params === "products" && <Filter />}
      {isLoading ? (
        <SkeletonList />
      ) : (
        <div
          className={
            "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          }
        >
          {productsPaginated?.data?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      {searchParams.params === "homepage" ? (
        <Button className="mx-auto" onClick={() => router.push("/products")}>
          View all products
        </Button>
      ) : (
        productsPaginated && (
          <Pagination<ProductType>
            pagination={productsPaginated}
            onPageChange={(page) => {
              const params = new URLSearchParams();

              // Preserve all existing search params
              if (searchParams.category)
                params.set("category", searchParams.category);
              if (searchParams.limit) params.set("limit", searchParams.limit);
              if (searchParams.sort) params.set("sort", searchParams.sort);
              if (searchParams.search)
                params.set("search", searchParams.search);
              if (searchParams.params)
                params.set("params", searchParams.params);

              // Set the new page
              params.set("page", page.toString());

              router.push(`/products?${params.toString()}`);
            }}
          />
        )
      )}
    </div>
  );
};

export default ProductListClient;
