import type { GetUsersResponse, Post, User, UserDataSource } from '../types';
import type { GetUsersReqPayload } from '../types';
import type { CreatePostPayload } from '../schemas/createPostSchema';
import { apiClient } from '../../../lib/apiClient';
import type { BaseApiClient } from '../../../lib/apiClient/base';

const createUserDataSource = (apiClient: BaseApiClient): UserDataSource => {
  const getUsers = async (payload: GetUsersReqPayload) => {
    return apiClient?.get<GetUsersResponse>(
      `/users?pageNumber=${payload.pageNumber}&pageSize=${payload.pageSize}`,
    );
  };

  const getUserPosts = async (userId: string) => {
    return apiClient?.get<Post[]>(`/posts?userId=${userId}`);
  };

  const createPost = async (payload: CreatePostPayload) => {
    return apiClient?.post<Post>(`/posts`, payload);
  };

  const deletePost = async (postId: string) => {
    return apiClient?.delete<void>(`/posts/${postId}`);
  };

  const getUserByUserId = async (userId: string) => {
    return apiClient?.get<User>(`/users/${userId}`);
  };

  return {
    getUsers,
    getUserPosts,
    createPost,
    deletePost,
    getUserByUserId,
  };
};

export const UsersApiDataSource: UserDataSource = createUserDataSource(apiClient);
