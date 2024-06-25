export interface OrderItem {
    name: string;
    quantity: number;
    image: string;
    price: string; // Assuming price is stored as a string
    productId:  string; // Can be either ObjectId or string depending on storage
}

export interface Order {
    id: string;
    userId: string; // Can be either ObjectId or string depending on storage
    items: OrderItem[];
    itemsPrice: number;
    totalPrice: number;
    shippingAddress: {
        address: string;
        city: string;
        postalCode: string;
        country: string;
    };
    shippingPrice: number;
    paymentMethod: string;
    paymentStatus: boolean;
    orderStatus: boolean;
    deliveredAt?: Date; // Optional property
    paidAt?: Date; // Optional property
}