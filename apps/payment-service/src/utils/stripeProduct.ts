import { StripeProductType } from "@repo/types";
import stripe from "./stripe";

export const createStripeProduct = async (item: StripeProductType) => {
  try {
    const res = await stripe.products.create({
      id: item.id,
      name: item.name,
      default_price_data: {
        currency: "usd",
        unit_amount: item.price * 100,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// utils/stripeProduct.ts - FIXED VERSION
export const getStripeProductPrice = async (stripeProductId: string) => {
  try {
    console.log("Fetching price for Stripe product:", stripeProductId);

    const prices = await stripe.prices.list({
      product: stripeProductId, // Must be a Stripe product ID like "prod_xxxxx"
      active: true,
      limit: 1,
    });

    const price = prices.data[0]?.unit_amount;
    console.log("Found price:", price);

    return price || null; // Return null on failure, not error
  } catch (error) {
    console.error("Error fetching Stripe price:", error);
    return null; // Return null, not the error object
  }
};

export const deleteStripeProduct = async (productId: number) => {
  try {
    const res = await stripe.products.del(productId.toString());
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};
