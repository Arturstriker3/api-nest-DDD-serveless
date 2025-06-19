export interface IPaginatedResult<T> {
  data: T[];
  total: number;
}

export interface IPaginationOptions {
  page: number;
  limit: number;
  offset: number;
}

export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
