import { Category } from "../Category";

export interface CategoryPagination {
  categories: Category[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}
