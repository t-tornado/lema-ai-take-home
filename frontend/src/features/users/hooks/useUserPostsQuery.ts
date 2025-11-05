import { useQuery } from '@tanstack/react-query';
import { UserService } from '../services/UserService';
import { useEffect, useState } from 'react';
import type { Post } from '../types';

export const useUserPostsQuery = (userId?: string) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['posts', userId],
    enabled: !!userId,
    queryFn: () => UserService.getUserPosts(userId!),
  });

  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data]);

  return {
    data: posts,
    isLoading,
    error,
    setPosts,
    refetch,
  };
};
