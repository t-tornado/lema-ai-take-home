import { useState } from 'react';
import { type CreatePostErrors, type CreatePostFormPayload } from '../schemas/createPostSchema';

export const useCreatePostModalForm = (onSubmit: (data: CreatePostFormPayload) => void) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState<CreatePostErrors | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const handleSubmit = async (data: CreatePostFormPayload) => {
    try {
      setErrors(null);
      await onSubmit(data);
      setTitle('');
      setBody('');
    } catch (error) {
      setErrors(error as CreatePostErrors);
      throw error;
    }
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
