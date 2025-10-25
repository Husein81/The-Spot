import { ProductInteraction } from "@/components/products";
import { ProductType } from "@repo/types";
import axios from "axios";
import Image from "next/image";

const fetchProduct = async (id: string): Promise<ProductType> => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/products/${id}`
  );
  const data = await res.data;
  return data;
};

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ color: string; size: string }>;
}) {
  const { id } = await params;
  const { color, size } = await searchParams;
  const product = await fetchProduct(id);

  const selectedColor = color ?? product.colors[0];
  const selectedSize = size ?? product.sizes[0];

  const images = ["/klarna.png", "/cards.png", "/stripe.png"];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 mt-14">
      {/* left column */}
      <div className="relative aspect-[2/3] w-full lg:w-3/4 p-4">
        <Image
          src={
            (product.images as Record<string, string>)?.[selectedColor] ?? ""
          }
          alt={product.name}
          fill
          className="object-contain rounded-md"
        />
      </div>
      {/* right column */}
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-bold">{product.name}</h1>
        <p className="text-sm text-gray-500">{product.description}</p>
        <span className="font-bold text-2xl">${product.price.toFixed(2)}</span>

        <ProductInteraction
          product={product}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
        />
        <div className="flex items-center gap-2">
          {images.map((image) => (
            <Image
              key={image}
              src={image}
              alt={image}
              width={50}
              height={25}
              className="rounded-md"
            />
          ))}
        </div>
        <p className="text-gray-500 text-xs">
          By clicking Pay Now, you agree to our{" "}
          <span className="underline hover:text-black">Terms & Conditions</span>{" "}
          and <span className="underline hover:text-black">Privacy Policy</span>
          . You authorize us to charge your selected payment method for the
          total amount shown. All sales are subject to our return and{" "}
          <span className="underline hover:text-black">Refund Policies</span>.
        </p>
      </div>
    </div>
  );
}
