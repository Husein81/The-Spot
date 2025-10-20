"use client";
import { Button, Shad } from "@repo/ui";
import { ProductType } from "@repo/types";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Select from "../Select";

type Props = {
  product: ProductType;
};
const ProductCard = ({ product }: Props) => {
  const [productTypes, setProductTypes] = useState({
    size: product.sizes[0]!,
    color: product.colors[0]!,
  });

  const handleProductType = ({
    type,
    value,
  }: {
    type: "size" | "color";
    value: string;
  }) => {
    setProductTypes((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <Shad.Card>
      <Shad.CardHeader>
        <Link href={`/products/${product.id}`}>
          <div className="relative aspect-[2/3]">
            <Image
              src={
                (product.images as Record<string, string>)?.[
                  productTypes.color
                ] || ""
              }
              alt={product.name}
              fill
              className="object-cover rounded-t-md hover:scale-105 transition-transform duration-200"
            />
          </div>
        </Link>
      </Shad.CardHeader>
      <Shad.CardContent>
        <div className="flex flex-col gap-4">
          <h1 className="font-medium">{product.name}</h1>
          <p className="text-sm text-gray-500">{product.shortDescription}</p>
          <div className="flex items-center text-xs justify-between">
            {/* Size */}
            <div className="flex flex-col gap-1">
              <span className="text">Size</span>
              <Select
                options={product.sizes.map((size) => ({
                  label: size,
                  value: size,
                }))}
                placeholder={productTypes.size}
                label="Size"
                size="sm"
                onValueChange={(value) =>
                  handleProductType({ type: "size", value })
                }
              />
            </div>

            {/* Colors */}
            <div className="flex flex-col gap-1">
              <span className="text-gray-500">Color</span>
              <div className="flex items-center gap-2">
                {product.colors.map((color) => (
                  <div
                    className={`cursor-pointer border-1 ${
                      productTypes.color === color
                        ? "border-gray-400"
                        : "border-gray-200"
                    } rounded-full p-[1.2px]`}
                    key={color}
                    onClick={() =>
                      handleProductType({ type: "color", value: color })
                    }
                  >
                    <div
                      className="w-[14px] h-[14px] rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Shad.CardContent>
      <Shad.CardFooter className="flex items-center justify-between">
        <span className="font-medium">${product.price.toFixed(2)}</span>
        <Button className="cursor-pointer">Add To Card</Button>
      </Shad.CardFooter>
    </Shad.Card>
  );
};

export default ProductCard;
