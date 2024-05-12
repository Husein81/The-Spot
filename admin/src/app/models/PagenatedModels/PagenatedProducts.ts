import { Product } from "../Product";

export interface PaginatedProduct {
    products: Product[],
    totalPages:number,
    currentPage: number,
    totalCount: number,
}