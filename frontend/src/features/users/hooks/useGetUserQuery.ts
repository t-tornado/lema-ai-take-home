import { useQuery } from '@tanstack/react-query';
import { UserService } from '../services/UserService';

interface UseGetUserQueryProps {
  userId: string;
  enabled: boolean;
}

export const useGetUserQuery = ({ userId, enabled }: UseGetUserQueryProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => UserService.getUserByUserId(userId),
    enabled,
    select: (data) => data.data,
  });

  return { data, isLoading, error };
};
