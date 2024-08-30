export interface Product {
  _id?: string;
  title: string;
  imageUrls: string[];
  description: string;
  cost: number;
  price: number;
  quantity: number;
  category: string;
  createdAt?: string;
  updatedAt?: string;
}
