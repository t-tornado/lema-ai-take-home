import type { CreateUserDataSourceFn, Post, User } from '../types';
import type { GetUsersReqPayload } from '../types';
import type { CreatePostPayload } from '../schemas/createPostSchema';
import { apiClient } from '../../../lib/apiClient';

const createUserDataSource: CreateUserDataSourceFn = (apiClient) => {
  const getUsers = async (payload: GetUsersReqPayload) => {
    return apiClient?.get<User[]>(
      `/users?pageNumber=${payload.pageNumber}&pageSize=${payload.pageSize}`,
    );
  };

  const getUserPosts = async (userId: number) => {
    return apiClient?.get<Post[]>(`/posts?userId=${userId}`);
  };

  const createPost = async (payload: CreatePostPayload) => {
    return apiClient?.post<Post>(`/posts`, payload);
  };

  const deletePost = async (postId: number) => {
    return apiClient?.delete<void>(`/posts/${postId}`);
  };

  return {
    getUsers,
    getUserPosts,
    createPost,
    deletePost,
  };
};

export const UsersApiDataSource = createUserDataSource(apiClient);
