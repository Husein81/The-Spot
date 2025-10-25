"use client";
import { useCartStore } from "@/store/cartStore";
import { Button, Icon, Separator, Shad } from "@repo/ui";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ShippingForm from "./ShippingForm";
import { useState } from "react";
import { ShippingFormInputs } from "@repo/types";
import PaymentForm from "./StripePaymentForm";

const StepsDetails = ({ selectedStep }: { selectedStep: number }) => {
  const { cart, removeFromCart } = useCartStore();
  const router = useRouter();

  const [shippingForm, setShippingForm] = useState<ShippingFormInputs>();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
      {/* COL 1 */}
      <Shad.Card>
        {selectedStep === 1 ? (
          <div className="flex flex-col gap-4 px-6 py-2">
            {/* Items */}
            {cart.map((item) => (
              <div
                key={item.id}
                className={"flex items-center justify-between"}
              >
                <div className="flex items-center gap-6">
                  <Image
                    src={
                      (item.images as Record<string, string>)?.[
                        item.selectedColor
                      ] || ""
                    }
                    alt={item.name}
                    width={90}
                    height={100}
                    className="object-cover size-32 rounded-md"
                  />
                  <div className="flex flex-col gap-2 text-gray-500">
                    <h1 className="font-medium text-primary">{item.name}</h1>
                    <span className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </span>
                    <span className="text-sm text-gray-500">
                      Size: {item.selectedSize}
                    </span>
                    <span className="text-sm text-gray-500">
                      Color: {item.selectedColor}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      {item.quantity > 1 && (
                        <span className="text-gray-400 text-xs font-medium">
                          (${item.price} x {item.quantity})
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className={
                    "size-8 cursor-pointer flex items-center justify-center rounded-full bg-destructive/20"
                  }
                  onClick={() => removeFromCart(item)}
                >
                  <Icon name={"Trash2"} className="text-destructive p-1" />
                </div>
              </div>
            ))}
          </div>
        ) : selectedStep === 2 ? (
          <ShippingForm setShippingForm={setShippingForm} />
        ) : selectedStep === 3 ? (
          <PaymentForm shippingForm={shippingForm!} />
        ) : (
          <p className="text-sm text-gray-500">
            Please fill in the shipping form to continue.
          </p>
        )}
      </Shad.Card>

      {/* COL 2 */}
      <Shad.Card className="h-fit">
        <Shad.CardContent className="flex flex-col gap-8">
          <h2 className="font-medium">Cart Details</h2>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-semibold">
              $
              {cart
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Discount</span>
            <span className="font-semibold">%10</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Shipping Fee</span>
            <span className="font-semibold">$10.0</span>
          </div>

          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Total</span>
            <span className="font-semibold">
              $
              {cart
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </span>
          </div>
          {selectedStep === 1 && (
            <Button
              onClick={() => router.push("/cart?step=2", { scroll: false })}
              className="w-full "
            >
              Continue
              <Icon name="ArrowRight" className="w-3 h-3" />
            </Button>
          )}
        </Shad.CardContent>
      </Shad.Card>
    </div>
  );
};

export default StepsDetails;
