import { useMutation } from '@tanstack/react-query';
import type { Post } from '../types';
import { alerts } from '../../../shared/alerts/notify';

interface UseDeletePostProps {
  setPosts: (posts: Post[]) => void;
  deletePostFn: (postId: string) => Promise<void>;
  stalePosts: Post[];
}

export const useDeletePostMutation = ({
  setPosts,
  deletePostFn,
  stalePosts,
}: UseDeletePostProps) => {
  const { mutateAsync: deletePost } = useMutation({
    mutationFn: deletePostFn,
  });

  const handleDeletePost = async (postId: string) => {
    const previousPosts = stalePosts;
    try {
      const updatedPosts = stalePosts.filter((post) => post.id !== postId);
      setPosts(updatedPosts);
      await deletePost(postId);
    } catch {
      setPosts(previousPosts);
      alerts.onError('Failed to delete post');
    }
  };

  return {
    handleDeletePost,
  };
};
