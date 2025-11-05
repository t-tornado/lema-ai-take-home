import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreatePostFormPayload, CreatePostPayload } from '../schemas/createPostSchema';
import type { Post } from '../types';
import { alerts } from '../../../shared/alerts/notify';

interface UseCreatePostMutationProps {
  setPosts: (posts: Post[]) => void;
  createPostFn: (payload: CreatePostPayload) => Promise<Post>;
  stalePosts: Post[];
  userId: string;
}
export const useCreatePostMutation = ({
  setPosts,
  createPostFn,
  stalePosts,
  userId,
}: UseCreatePostMutationProps) => {
  const queryClient = useQueryClient();
  const queryKey = ['posts', userId];
  const { mutateAsync: createPost, isPending } = useMutation({
    mutationFn: createPostFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const handleCreatePost = async (payload: CreatePostFormPayload) => {
    const previousPosts = stalePosts;
    try {
      const newPost = await createPost({ ...payload, user_id: userId });
      setPosts([...stalePosts, newPost]);
      alerts.onSuccess('Post created successfully');
    } catch (error) {
      alerts.onError('Failed to create post');
      setPosts(previousPosts);
      throw error;
    }
  };

  return {
    handleCreatePost,
    isLoading: isPending,
  };
};
