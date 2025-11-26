"use client";

import { ReactNode } from "react";
import CheckoutForm from "./CheckoutForm";
import { ShippingFormInputs } from "@repo/types";

const PaymentForm = ({
  shippingForm,
}: {
  shippingForm: ShippingFormInputs;
}): ReactNode => {
  return (
    <div className="w-full">
      <CheckoutForm shippingForm={shippingForm} />
    </div>
  );
};

export default PaymentForm;
