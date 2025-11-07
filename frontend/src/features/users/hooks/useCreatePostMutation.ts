import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createPostSchema,
  type CreatePostFormPayload,
  type CreatePostPayload,
} from '../schemas/createPostSchema';
import type { Post } from '../types';
import { QUERY_KEYS } from '../const';

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
  const queryKey = [QUERY_KEYS.posts, userId];
  const { mutateAsync: createPost, isPending } = useMutation({
    mutationFn: createPostFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const handleCreatePost = async (payload: CreatePostFormPayload) => {
    const previousPosts = stalePosts;
    try {
      const result = createPostSchema.safeParse(payload);
      if (!result.success) {
        throw result.error;
      }
      const newPost = await createPost({ ...payload, user_id: userId });
      setPosts([newPost, ...stalePosts]);
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
