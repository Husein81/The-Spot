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

  const res = await axios.get(url);
  return res.data;
};

const ProductList = async ({
  page,
  limit,
  category,
  sort,
  search,
  params,
}: {
  page: string;
  limit: string;
  category: string;
  sort?: string;
  search?: string;
  params: "homepage" | "products";
}) => {
  const initialData = await fetchProducts({
    category,
    sort,
    search,
    params,
  });
  return (
    <ProductListClient
      searchParams={{
        page,
        limit,
        category,
        sort,
        search,
        params,
      }}
      initialData={initialData}
    />
  );
};

export default ProductList;
