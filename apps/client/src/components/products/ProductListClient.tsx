"use client";
import { useGetProducts } from "@/hooks/products";
import type { ProductType } from "@repo/types";
import { Button } from "@repo/ui";
import { useRouter } from "next/navigation";
import SkeletonList from "../SkeletonList";
import ProductCard from "./ProductCard";
import Filter from "../Filter";
import Pagination from "../Pagination";

type Props = {
  initialProducts: Array<ProductType>;
  searchParams: {
    category: string;
    sort?: string;
    search?: string;
    params: "homepage" | "products";
  };
};

const ProductListClient = ({ initialProducts, searchParams }: Props) => {
  const router = useRouter();
  const { data: productsPaginated, isLoading } = useGetProducts(
    searchParams,
    initialProducts
  );
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
        <Button className="w-full" onClick={() => router.push("/products")}>
          View all products
        </Button>
      ) : (
        <Pagination
          pagination={productsPaginated!}
          onPageChange={(page) => {
            const params = new URLSearchParams({
              ...searchParams,
              page: String(page),
            });
            router.push(`/products?${params.toString()}`);
          }}
        />
      )}
    </div>
  );
};

export default ProductListClient;
