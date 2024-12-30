import { Category } from "./Category";

export interface Product {
  _id?: string;
  title: string;
  imageUrls: string[];
  description: string;
  cost: number;
  price: number;
  quantity: number;
  category: Category;
  createdAt?: string;
  updatedAt?: string;
}
