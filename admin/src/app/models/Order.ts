import { OrderItem } from "./OrderItem";

interface ShippingAddress {
  _id?: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}
export interface Order {
  _id?: string;
  user: string;
  items: OrderItem[];
  itemsPrice: number;
  totalPrice: number;
  shippingAddress: ShippingAddress;
  shippingPrice: number;
  paymentMethod: string;
  paymentStatus: boolean;
  orderStatus: boolean;
  deliveredAt: string;
  paidAt: string;
  createdAt: string;
  updatedAt: string;
}
