export interface Category {
    _id?: string;
    name: string;
    parent?: Category; // Optional reference to a parent category
    __v?: number;
  }
  