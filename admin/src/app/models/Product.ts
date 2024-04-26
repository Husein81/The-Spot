export interface Product {
    _id: string;
    imageUrls: string[] ;
    title: string;
    description?: string; // Optional property
    price: number;
    quantity: string;
    category?: string; // Assuming category is stored as a string ID
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
  }
  