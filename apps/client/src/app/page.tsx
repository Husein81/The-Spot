import { ProductList } from "@/components/products";
import Image from "next/image";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) {
  const category = (await searchParams).category;
  return (
    <div className={""}>
      <div className="relative aspect-[3/1] mb-14">
        <Image src={"/featured.png"} alt="Featured" fill />
      </div>
      <ProductList category={category} params="homepage" />
    </div>
  );
}
