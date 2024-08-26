import { OrderItem } from "./OrderItem";
import { User } from "./User";

export interface ShippingAddress {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  }
  
  // Define the interface for an Order
  export interface IOrder {
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