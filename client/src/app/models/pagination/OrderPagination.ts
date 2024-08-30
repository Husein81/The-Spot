import { Order } from "../Order";

export interface OrderPagination {
    orders: Order[];
    totalPages: number;
    currentPage: number;
    totalCount: number;
}