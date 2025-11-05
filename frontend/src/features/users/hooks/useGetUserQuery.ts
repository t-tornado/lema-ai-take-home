import { useQuery } from '@tanstack/react-query';
import { UserService } from '../services/UserService';

interface UseGetUserQueryProps {
  userId: string;
  enabled: boolean;
}

export const useGetUserQuery = ({ userId, enabled }: UseGetUserQueryProps) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => UserService.getUserByUserId(userId),
    enabled,
    select: (data) => data.data,
  });
};
