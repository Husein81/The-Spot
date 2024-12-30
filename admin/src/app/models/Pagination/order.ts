import { Order } from "../Order";

export interface OrderPagination {
  orders: Order[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}
