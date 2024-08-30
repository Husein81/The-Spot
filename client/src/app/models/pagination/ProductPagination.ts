import { Product } from "../Product";

export interface ProductPagination{
    currentPage: number;
    totalPages: number;
    products: Product[];
    totalCount: number;
}