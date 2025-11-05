export interface User {
  id: number;
  name: string;
  email: string;
  address: string;
}

export interface UserTableState {
  isLoading: boolean;
  error: string | null;
  data: User[];
  totalUsers: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: number;
  previousPage: number;
}
