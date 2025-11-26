import { Pagination, ProductType, QueryParams } from "@repo/types";
import ProductClient from "./page-client";

async function fetchProducts(
  params?: QueryParams
): Promise<Pagination<ProductType>> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products?page=${params?.page || "1"}&limit=${params?.limit || "10"}&search=${params?.search || ""}`
    );
    return response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export default async function ProductPage({
  searchParams,
}: {
  searchParams: Promise<QueryParams>;
}) {
  const params = await searchParams;
  const { page, limit, search } = params;
  const products = await fetchProducts({ page, limit, search });
  return (
    <ProductClient
      products={products}
      initialParams={{ page, limit, search }}
    />
  );
}
