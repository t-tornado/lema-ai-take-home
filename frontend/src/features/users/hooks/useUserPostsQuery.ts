import { useMutation, useQuery } from '@tanstack/react-query';
import { UserService } from '../services/UserService';
import { useEffect, useState } from 'react';
import type { Post } from '../types';

export const useUserPostsQuery = (userId?: string) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['posts', userId],
    enabled: !!userId,
    queryFn: () => UserService.getUserPosts(userId!),
  });

  const { mutateAsync: deletePost } = useMutation({
    mutationFn: (postId: string) => UserService.deletePost(postId),
  });

  const handleDeletePost = async (postId: string) => {
    const previousPosts = posts;
    try {
      const updatedPosts = posts.filter((post) => post.id !== postId);
      setPosts(updatedPosts);
      await deletePost(postId);
    } catch (error) {
      setPosts(previousPosts);
      console.error(error);
    }
  };

  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data]);

  return {
    data: posts,
    isLoading,
    error,
    handleDeletePost,
  };
};
