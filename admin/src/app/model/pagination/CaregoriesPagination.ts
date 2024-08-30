import { Category } from "../Category";

export interface CategoriesPagination {
    currentPage: number;
    totalPages: number;
    categories: Category[];
    totalCount: number;
}