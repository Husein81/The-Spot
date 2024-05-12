import { Category } from "../Category";

export interface PagenatedCategory{
    categories: Category[];
    page: number;
    pages: number;
}