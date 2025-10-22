"use client";
import { ShippingFormInputs } from "@repo/types";
import { Button, Icon } from "@repo/ui";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import InputField from "./InputField";

const ShippingForm = ({
  setShippingForm,
}: {
  setShippingForm: (value: ShippingFormInputs) => void;
}) => {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
    },
    onSubmit: ({ value }) => {
      setShippingForm(value);
      router.push("/cart?step=3", { scroll: false });
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    form.handleSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <form.Field name="name">
        {(field) => (
          <InputField
            label="Name"
            placeholder="Enter your name"
            field={field}
          />
        )}
      </form.Field>
      <form.Field name="email">
        {(field) => (
          <InputField
            label="Email"
            type={"email"}
            placeholder="Enter your email"
            field={field}
          />
        )}
      </form.Field>
      <form.Field name="phone">
        {(field) => (
          <InputField
            label="Phone"
            type={"tel"}
            placeholder="Enter your phone number"
            field={field}
          />
        )}
      </form.Field>
      <form.Field name="address">
        {(field) => (
          <InputField
            label="Address"
            placeholder="Enter your address"
            field={field}
          />
        )}
      </form.Field>
      <form.Field name="city">
        {(field) => (
          <InputField
            label="City"
            placeholder="Enter your city"
            field={field}
          />
        )}
      </form.Field>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button
            className="w-full cursor-pointer"
            type="submit"
            disabled={!canSubmit || isSubmitting}
          >
            Continue <Icon name="ArrowRight" />
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
};
export default ShippingForm;
