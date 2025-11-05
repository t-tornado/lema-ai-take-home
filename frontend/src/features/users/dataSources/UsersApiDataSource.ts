import type { GetUsersResponse, Post } from '../types';
import type { GetUsersReqPayload } from '../types';
import type { CreatePostPayload } from '../schemas/createPostSchema';
import { apiClient } from '../../../lib/apiClient';
import type { BaseApiClient } from '../../../lib/apiClient/base';

const createUserDataSource = (apiClient: BaseApiClient) => {
  const getUsers = async (payload: GetUsersReqPayload) => {
    return apiClient?.get<GetUsersResponse>(
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
