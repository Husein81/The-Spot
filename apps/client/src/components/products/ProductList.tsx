import axios from "axios";
import ProductListClient from "./ProductListClient";
import { Pagination, ProductType } from "@repo/types";

const fetchProducts = async ({
  category,
  sort,
  search,
  params,
}: {
  category?: string;
  sort?: string;
  search?: string;
  params: "homepage" | "products";
}): Promise<Pagination<ProductType>> => {
  // Use absolute URL for server-side fetch
  const baseUrl = "http://localhost:5001";

  const queryParams = new URLSearchParams();
  if (category) queryParams.append("category", category);
  if (search) queryParams.append("search", search);
  queryParams.append("sort", sort || "newest");
  if (params === "homepage") queryParams.append("limit", "8");

  const url = `${baseUrl}/api/products?${queryParams.toString()}`;

  const res = await fetch(url, {
    cache: "no-store", // or 'force-cache' depending on your needs
  });

  if (!res.ok) {
    console.error("Failed to fetch products:", res.status, await res.text());
    return { data: [], totalPages: 0, totalCount: 1, currentPage: 0 }; // fallback
  }

  const data = await res.json();
  return data;
};

const ProductList = async ({
  category,
  sort,
  search,
  params,
}: {
  category: string;
  sort?: string;
  search?: string;
  params: "homepage" | "products";
}) => {
  const { data } = await fetchProducts({
    category,
    sort,
    search,
    params,
  });
  return (
    <ProductListClient
      params={{
        category,
        sort,
        search,
        params,
      }}
      initialProducts={data}
    />
  );
};

export default ProductList;
