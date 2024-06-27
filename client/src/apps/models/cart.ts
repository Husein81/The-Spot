import { Product } from "./Product";

export interface cartItem extends Product{
    quantity: number;
}
