import { UsersApiDataSource } from '../dataSources/UsersApiDataSource';
import type { CreatePostPayload } from '../schemas/createPostSchema';
import type { CreateUserServiceFn, GetUsersReqPayload, User } from '../types';

const createUserService: CreateUserServiceFn = (dataSource) => {
  const getUsers = async (payload: GetUsersReqPayload) => {
    const data = (await dataSource.getUsers(payload)) as unknown as User[];
    return {
      data,
    };
  };

  const getUserPosts = async (userId: string) => {
    const posts = await dataSource.getUserPosts(userId);
    const sorted = posts.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
    return sorted;
  };

  const createPost = async (payload: CreatePostPayload) => {
    return dataSource.createPost(payload);
  };

  const deletePost = async (postId: string) => {
    return dataSource.deletePost(postId);
  };

  const getUserByUserId = async (userId: string) => {
    return dataSource.getUserByUserId(userId);
  };

  const getUsersCount = async () => {
    return dataSource.getUsersCount();
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

export const UserService = createUserService(UsersApiDataSource);
