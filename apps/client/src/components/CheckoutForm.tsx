"use client";

import { ShippingFormInputs } from "@repo/types";
import { Button } from "@repo/ui";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import InputField from "./InputField";

const paymentFormSchema = z.object({
  cardNumber: z
    .string()
    .min(16, "Card number must be 16 digits")
    .max(19, "Card number is too long")
    .regex(/^[\d\s]+$/, "Invalid card number"),
  cardName: z.string().min(1, "Cardholder name is required"),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date (MM/YY)"),
  cvv: z
    .string()
    .min(3, "CVV must be 3 or 4 digits")
    .max(4, "CVV must be 3 or 4 digits")
    .regex(/^\d+$/, "CVV must contain only numbers"),
});

const CheckoutForm = ({
  shippingForm,
}: {
  shippingForm: ShippingFormInputs;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm({
    defaultValues: {
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
    },
    onSubmit: async ({ value }) => {
      setLoading(true);
      setError(null);

      try {
        // Call payment service
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/payment/process`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              paymentDetails: value,
              shippingDetails: shippingForm,
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Payment failed");
        }

        const result = await response.json();
        setSuccess(true);
        console.log("Payment successful:", result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Payment failed");
      } finally {
        setLoading(false);
      }
    },
  });

  if (success) {
    return (
      <div className="p-6 border border-green-500 rounded-md bg-green-50">
        <h3 className="text-lg font-semibold text-green-700 mb-2">
          Payment Successful!
        </h3>
        <p className="text-green-600">
          Your order has been placed successfully.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-4 p-4"
    >
      <form.Field
        name="cardNumber"
        validators={{
          onChange: (value) =>
            paymentFormSchema.shape.cardNumber.safeParse(value).success
              ? ""
              : "Invalid card number",
        }}
      >
        {(field) => (
          <InputField
            label="Card number"
            field={field}
            placeholder="4242 4242 4242 4242"
          />
        )}
      </form.Field>

      <form.Field
        name="cardName"
        validators={{
          onChange: (value) =>
            paymentFormSchema.shape.cardName.safeParse(value).success
              ? ""
              : "Invalid cardholder name",
        }}
      >
        {(field) => (
          <InputField
            label="Cardholder Name"
            field={field}
            placeholder="Your Name"
          />
        )}
      </form.Field>

      <div className="grid grid-cols-2 gap-4">
        <form.Field
          name="expiryDate"
          validators={{
            onChange: (value) =>
              paymentFormSchema.shape.expiryDate.safeParse(value).success
                ? ""
                : "Invalid expiry date",
          }}
        >
          {(field) => (
            <InputField
              label="Expiry Date (MM/YY)"
              field={field}
              placeholder="MM/YY"
              maxLength={5}
            />
          )}
        </form.Field>

        <form.Field
          name="cvv"
          validators={{
            onChange: (value) =>
              paymentFormSchema.shape.cvv.safeParse(value).success
                ? ""
                : "Invalid CVV",
          }}
        >
          {(field) => (
            <InputField
              label="CVV"
              field={field}
              placeholder="123"
              maxLength={4}
            />
          )}
        </form.Field>
      </div>

      {error && (
        <div className="p-3 border border-red-500 rounded-md bg-red-50">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  );
};

export default CheckoutForm;
