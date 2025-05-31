import { z } from "zod";

// enums
export enum OrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}
export enum PaymentMethod {
  CREDIT_CARD = "credit_card",
  PAYPAL = "paypal",
  BANK_TRANSFER = "bank_transfer",
  CASH_ON_DELIVERY = "cash_on_delivery",
}
export enum PaymentStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
  REFUNDED = "refunded",
}

// schemas
export const userSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  avatar: z.string().url().optional(),
  phone: z.string().optional(),
  isAdmin: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
});

export const productSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string(),
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative(),
  categoryId: z.string(),
  imageUrls: z.array(z.string().url()),
  createdAt: z.date(),
});

export const categorySchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  imageUrl: z.string(),
});

export const cartItemSchema = z.object({
  id: z.string().cuid(),
  cartId: z.string(),
  productId: z.string(),
  quantity: z.number().int().positive(),
});

export const orderSchema = z.object({
  id: z.string().cuid(),
  orderDate: z.date(),
  status: z.nativeEnum(OrderStatus),
  shippingAddress: z.string(),
  totalAmount: z.number().nonnegative(),
  userId: z.string(),
});

export const orderItemSchema = z.object({
  id: z.string().cuid(),
  orderId: z.string(),
  productId: z.string(),
  quantity: z.number().int().positive(),
  price: z.number().nonnegative(),
});

export const paymentSchema = z.object({
  id: z.string().cuid(),
  paymentDate: z.date(),
  amount: z.number().nonnegative(),
  orderId: z.string(),
  paymentMethod: z.nativeEnum(PaymentMethod),
  status: z.nativeEnum(PaymentStatus),
});

export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().default(10),
});

export const paginatedResponseSchema = <T>(itemSchema: z.ZodType<T>) =>
  z.object({
    data: z.array(itemSchema),
    total: z.number().int().nonnegative(),
    page: z.number().int().positive().default(1),
    totalPages: z.number().int().positive(),
  });

export type User = z.infer<typeof userSchema>;
export type Product = z.infer<typeof productSchema>;
export type Category = z.infer<typeof categorySchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type Order = z.infer<typeof orderSchema>;
export type OrderItem = z.infer<typeof orderItemSchema>;
export type Payment = z.infer<typeof paymentSchema>;

// Paginated responses
export type Paginate = z.infer<typeof paginationSchema>;
export type PaginatedProductResponse = z.infer<
  ReturnType<typeof paginatedResponseSchema<typeof productSchema>>
>;
export type PaginatedCategoryResponse = z.infer<
  ReturnType<typeof paginatedResponseSchema<typeof categorySchema>>
>;
export type PaginatedOrderResponse = z.infer<
  ReturnType<typeof paginatedResponseSchema<typeof orderSchema>>
>;
