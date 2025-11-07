import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  body: z.string().min(1, { message: 'Body is required' }),
});

export type CreatePostFormPayload = z.infer<typeof createPostSchema>;

export type CreatePostPayload = CreatePostFormPayload & { user_id: string };

export type CreatePostErrors = z.ZodError;
