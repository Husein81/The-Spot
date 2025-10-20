import { ProductList } from "@/components/products";

type Props = {
  searchParams: Promise<{ category: string; sort: string; search: string }>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const category = (await searchParams).category;
  const sort = (await searchParams).sort;
  const search = (await searchParams).search;
  return (
    <div>
      <ProductList
        category={category}
        sort={sort}
        search={search}
        params={"products"}
      />
    </div>
  );
}
