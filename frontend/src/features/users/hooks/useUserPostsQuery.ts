import { useQuery } from '@tanstack/react-query';
import { UserService } from '../services/UserService';

export const useUserPostsQuery = (userId?: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts', userId],
    enabled: !!userId,
    queryFn: () => UserService.getUserPosts(userId!),
  });

  return {
    data,
    isLoading,
    error,
  };
};
