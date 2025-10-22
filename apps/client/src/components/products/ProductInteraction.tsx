"use client";
import { useCartStore } from "@/store/cartStore";
import { ProductType } from "@repo/types";
import { Button, cn, Icon } from "@repo/ui";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  product: ProductType;
  selectedColor: string;
  selectedSize: string;
};

const ProductInteraction = ({
  product,
  selectedColor,
  selectedSize,
}: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [quantity, setQuantity] = useState(0);
  const { addToCart } = useCartStore();

  const handleSize = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("size", value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleColor = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("color", value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleQuantity = (value: number) => {
    if (value < 0) return;
    setQuantity(value);
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      selectedColor,
      selectedSize,
    });
    toast.success("Product added to cart");
  };

  return (
    <div className="space-y-4">
      {/* Size */}
      <div className="flex flex-col gap-2">
        <span className="text-gray-500 text-sm">Size</span>
        <div className="flex items-center gap-2">
          {product.sizes.map((size) => (
            <Button
              key={size}
              size="sm"
              variant={selectedSize === size ? "default" : "outline"}
              onClick={() => handleSize(size)}
              className={cn("cursor-pointer uppercase selection:bg-primary", {
                "bg-primary  text-white": selectedSize === size,
              })}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      {/* Color */}
      <div className="flex flex-col gap-2">
        <span className="text-gray-500 text-sm">Color</span>
        <div className="flex items-center gap-2">
          {product.colors.map((color) => (
            <div
              key={color}
              className={cn(
                "cursor-pointer size-6 border border-gray-200 rounded-sm",
                {
                  "border-gray-400": selectedColor === color,
                }
              )}
              style={{ background: color }}
              onClick={() => handleColor(color)}
            />
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="flex flex-col gap-2">
        <span className="text-gray-500 text-sm mt-4">Quantity</span>
        <div className="flex items-center gap-2">
          <Button
            disabled={quantity === 0}
            size="sm"
            variant="outline"
            onClick={() => handleQuantity(quantity - 1)}
          >
            <Icon name={"Minus"} />
          </Button>

          <span>{quantity}</span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuantity(quantity + 1)}
          >
            <Icon name={"Plus"} />
          </Button>
        </div>
      </div>

      <Button className="w-full" onClick={handleAddToCart}>
        <Icon name="Plus" />
        <span>Add To Cart</span>
      </Button>
      <Button variant="outline" className="w-full">
        <Icon name="ShoppingCart" />
        <span>Buy this item</span>
      </Button>
    </div>
  );
};

export default ProductInteraction;
