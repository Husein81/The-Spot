export interface Pagination {
  page: number;
  pageSize: number;
  searchTerm?: string;
  sort?: string;
  order?: string;
}
