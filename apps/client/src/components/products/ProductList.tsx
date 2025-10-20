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

  const data = await res.data;
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
      searchParams={{
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
