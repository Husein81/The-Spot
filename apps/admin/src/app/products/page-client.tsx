"use client";
import DataTable from "@/components/data-table";
import { columns } from "./columns";
import { Pagination, ProductType, QueryParams } from "@repo/types";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  products: Pagination<ProductType>;
  initialParams: QueryParams;
};
export default function ProductClient({ products, initialParams }: Props) {
  const { page = "1", limit = "10" } = initialParams;

  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.replace(`/products?${params.toString()}`, { scroll: false });
  };

  const handleSizeChange = (newSize: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", newSize.toString());
    router.replace(`/products?${params.toString()}`, { scroll: false });
  };

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", value);
    router.replace(`/products?${params.toString()}`, { scroll: false });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Products</h1>
      <DataTable
        columns={columns}
        onSearch={handleSearch}
        data={products.data}
        pagination={{
          page,
          limit,
          total: products.totalPages.toString(),
          onPageChange: handlePageChange,
          onSizeChange: handleSizeChange,
        }}
      />
    </div>
  );
}
