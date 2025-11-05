import type {
  GetUserByUserIdResponse,
  GetUsersCountApiResponse,
  GetUsersResponse,
  Post,
  UserDataSource,
} from '../types';
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
    return apiClient?.get<GetUserByUserIdResponse>(`/users/${userId}`);
  };

  const getUsersCount = async () => {
    return apiClient?.get<GetUsersCountApiResponse>(`/users/count`);
  };

  return {
    getUsers,
    getUserPosts,
    createPost,
    deletePost,
    getUserByUserId,
    getUsersCount,
  };
};

export const UsersApiDataSource: UserDataSource = createUserDataSource(apiClient);
