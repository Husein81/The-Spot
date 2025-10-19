import mongoose, { InferSchemaType } from "mongoose";

const { Schema } = mongoose;

export const OrderStatus = ["success", "failed"] as const;

const OrderSchema = new Schema(
  {
    userId: { type: String, required: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: OrderStatus, default: "success" },
    products: {
      type: [
        {
          name: { type: String, required: true },
          quantity: { type: Number, required: true },
          price: { type: Number, required: true },
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

export type OrderSchemaType = InferSchemaType<typeof OrderSchema>;

export const Order = mongoose.model<OrderSchemaType>("Order", OrderSchema);
