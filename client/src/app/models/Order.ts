import { OrderItem } from "./OrderItem";
import { User } from "./User";

export interface ShippingAddress {
  _id?: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}
  

export interface Order {
  _id?: string
  user:User;
  items: OrderItem[];
  itemsPrice: number;
  totalPrice: number;
  shippingAddress: ShippingAddress;
  shippingPrice: number;
  paymentMethod: string;
  paymentStatus: boolean;
  orderStatus: boolean;
  deliveredAt?: Date;
  paidAt?: Date;
}