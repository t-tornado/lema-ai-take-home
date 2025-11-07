import { useQuery } from '@tanstack/react-query';
import { UserService } from '../services/UserService';
import { QUERY_KEYS } from '../const';

interface UseGetUserQueryProps {
  userId: string;
  enabled: boolean;
}

export const useGetUserQuery = ({ userId, enabled }: UseGetUserQueryProps) => {
  return useQuery({
    queryKey: [QUERY_KEYS.user, userId],
    queryFn: () => UserService.getUserByUserId(userId),
    enabled,
    select: (data) => data.data,
  });
};
