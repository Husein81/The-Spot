export interface Product {
    _id: string;
    title: string;
    imageUrls: string[] ;
    description?: string; // Optional property
    price: number;
    quantity: number;
    category?: string; // Assuming category is stored as a string ID
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
  }
  