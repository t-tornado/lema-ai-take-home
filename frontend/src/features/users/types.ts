import type { CreatePostPayload } from './schemas/createPostSchema';

export interface UserAddress {
  id: string;
  user_id: string;
  street: string;
  state: string;
  city: string;
  zipcode: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  address: UserAddress | null;
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

export interface GetUserByUserIdResponse {
  data: User;
  status: string;
}

export interface UserService {
  getUsers: (payload: GetUsersReqPayload) => Promise<GetUsersResponse>;
  getUserPosts: (userId: string) => Promise<Post[]>;
  createPost: (payload: CreatePostPayload) => Promise<Post>;
  deletePost: (postId: string) => Promise<void>;
  getUserByUserId: (userId: string) => Promise<GetUserByUserIdResponse>;
}

export interface UserDataSource {
  getUsers: (payload: GetUsersReqPayload) => Promise<GetUsersResponse>;
  getUserPosts: (userId: string) => Promise<Post[]>;
  createPost: (payload: CreatePostPayload) => Promise<Post>;
  deletePost: (postId: string) => Promise<void>;
  getUserByUserId: (userId: string) => Promise<UsGetUserByUserIdResponseer>;
}

export type CreateUserServiceFn = (dataSource: UserDataSource) => UserService;

export interface UsersTablePaginationState {
  pageNumber: number;
  pageSize: number;
  totalUsers: number;
}
