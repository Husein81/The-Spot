import { ProductList } from "@/components/products";

type Props = {
  searchParams: Promise<{
    page: string;
    limit: string;
    category: string;
    sort: string;
    search: string;
  }>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const page = (await searchParams).page;
  const limit = (await searchParams).limit;
  const category = (await searchParams).category;
  const sort = (await searchParams).sort;
  const search = (await searchParams).search;

  return (
    <div>
      <ProductList
        page={page}
        limit={limit}
        category={category}
        sort={sort}
        search={search}
        params={"products"}
      />
    </div>
  );
}
