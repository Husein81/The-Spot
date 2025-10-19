export type Pagination<T> = {
  data: T[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
};
