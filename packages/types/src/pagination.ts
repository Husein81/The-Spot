export type Pagination<T> = {
  data: T[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
};

export type QueryParams = {
  page?: string;
  limit?: string;
  category?: string;
  sort?: string;
  search?: string;
};
