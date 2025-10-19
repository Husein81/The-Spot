"use client";
import type { ProductType } from "@repo/types";
import ProductCard from "./ProductCard";
import { Button, Skeleton } from "@repo/ui";
import { useRouter } from "next/navigation";
import { useGetProducts } from "@/hooks/products";

type Props = {
  initialProducts: Array<ProductType>;
  params: {
    category: string;
    sort?: string;
    search?: string;
    params: "homepage" | "products";
  };
};

const ProductListClient = ({ initialProducts, params }: Props) => {
  const router = useRouter();
  const { data: productsPaginated, isLoading } = useGetProducts(
    params,
    initialProducts
  );
  return (
    <div className="flex flex-col gap-4">
      <div
        className={
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        }
      >
        {isLoading ? (
          <>
            {[...Array(8)].map((_, idx) => (
              <div
                key={idx}
                className="flex flex-col space-y-3 rounded-2xl border p-4 shadow-sm"
              >
                {/* Product Image */}
                <Skeleton className="h-48 w-full rounded-xl" />

                <div className="space-y-2">
                  {/* Product Name */}
                  <Skeleton className="h-4 w-3/4" />

                  {/* Description */}
                  <Skeleton className="h-3 w-5/6" />
                  <Skeleton className="h-3 w-4/5" />

                  {/* Price */}
                  <Skeleton className="h-5 w-1/3" />
                </div>

                {/* Add to Cart Button */}
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
            ))}
          </>
        ) : (
          productsPaginated?.data?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
      <Button className="w-full" onClick={() => router.push("/products")}>
        View All
      </Button>
    </div>
  );
};

export default ProductListClient;
