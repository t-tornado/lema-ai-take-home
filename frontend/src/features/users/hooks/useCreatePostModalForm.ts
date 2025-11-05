import { useState } from 'react';
import {
  createPostSchema,
  type CreatePostErrors,
  type CreatePostPayload,
} from '../schemas/createPostSchema';

export const useCreatePostModalForm = (onSubmit: (data: CreatePostPayload) => void) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState<CreatePostErrors | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const handleSubmit = async (data: CreatePostPayload) => {
    setErrors(null);
    const result = createPostSchema.safeParse(data);
    if (!result.success) {
      setErrors(result.error.issues);
      return;
    }
    await onSubmit(data);
    setTitle('');
    setBody('');
    setErrors(null);
  };

  return {
    title,
    body,
    handleTitleChange,
    handleBodyChange,
    handleSubmit,
    errors,
  };
};
