import { Product } from "./Product";

export interface OrderItem {
    name: string;
    quantity: number;
    image: string;
    price: string;
    product: Product;
}