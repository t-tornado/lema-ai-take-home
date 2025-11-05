import type { CreatePostPayload } from './schemas/createPostSchema';

export interface User {
  id: string;
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
export interface Post {
  id: string;
  user_id: number;
  title: string;
  body: string;
  created_at: string;
}

export interface GetUsersReqPayload {
  pageNumber: number;
  pageSize: number;
}

export interface GetUsersResponse {
  data: User[];
  totalUsers: number;
}
export interface UserService {
  getUsers: (payload: GetUsersReqPayload) => Promise<GetUsersResponse>;
  getUserPosts: (userId: number) => Promise<Post[]>;
  createPost: (payload: CreatePostPayload) => Promise<Post>;
  deletePost: (postId: number) => Promise<void>;
}

export interface UserDataSource {
  getUsers: (payload: GetUsersReqPayload) => Promise<GetUsersResponse>;
  getUserPosts: (userId: number) => Promise<Post[]>;
  createPost: (payload: CreatePostPayload) => Promise<Post>;
  deletePost: (postId: number) => Promise<void>;
}

export type CreateUserServiceFn = (dataSource: UserDataSource) => UserService;

export interface UsersTablePaginationState {
  pageNumber: number;
  pageSize: number;
  totalUsers: number;
}
