"use client";
import { useCartStore } from "@/store/cartStore";
import { Icon } from "@repo/ui";

const ShoppingCartIcon = ({ icon }: { icon: string }) => {
  const { cart, hasHydrated } = useCartStore();

  if (!hasHydrated) return null;
  return (
    <div className="flex items-center gap-2 cursor-pointer relative">
      <Icon name={icon} className={"size-5 text-gray-600"} />
      {cart.length > 0 && (
        <div className="absolute -top-3 -right-3 flex items-center bg-amber-400 text-white text-xs font-medium rounded-full size-5 px-1.5">
          {cart.reduce((acc, item) => acc + item.quantity, 0)}
        </div>
      )}
    </div>
  );
};
export default ShoppingCartIcon;
