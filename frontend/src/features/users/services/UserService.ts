import { UsersApiDataSource } from '../dataSources/UsersApiDataSource';
import type { CreatePostPayload } from '../schemas/createPostSchema';
import type { CreateUserServiceFn, GetUsersReqPayload } from '../types';

const createUserService: CreateUserServiceFn = (dataSource) => {
  const getUsers = async (payload: GetUsersReqPayload) => {
    return dataSource.getUsers(payload);
  };

  const getUserPosts = async (userId: number) => {
    return dataSource.getUserPosts(userId);
  };

  const createPost = async (payload: CreatePostPayload) => {
    return dataSource.createPost(payload);
  };

  const deletePost = async (postId: number) => {
    return dataSource.deletePost(postId);
  };

  return {
    getUsers,
    getUserPosts,
    createPost,
    deletePost,
  };
};

export const UserService = createUserService(UsersApiDataSource);
