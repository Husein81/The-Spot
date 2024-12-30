import { Product } from "../Product";

export interface ProductPagination {
  products: Product[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}
