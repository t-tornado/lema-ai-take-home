import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreatePostPayload } from '../schemas/createPostSchema';
import type { Post } from '../types';

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

  const handleCreatePost = async (payload: CreatePostPayload) => {
    const previousPosts = stalePosts;
    try {
      const newPost = await createPost(payload);
      setPosts([...stalePosts, newPost]);
    } catch (error) {
      setPosts(previousPosts);
      throw error;
    }
  };

  return {
    handleCreatePost,
    isLoading: isPending,
  };
};
