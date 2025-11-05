import { useNavigate } from 'react-router-dom';
import type { User } from '../types';

export const useUserTableActions = () => {
  const navigate = useNavigate();

  const viewUserPosts = (user: User) => {
    navigate(`/post/${user.id}`, { state: { user } });
  };
  return {
    viewUserPosts,
  };
};
