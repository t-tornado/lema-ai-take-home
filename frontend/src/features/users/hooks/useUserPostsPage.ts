import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import type { User } from '../types';
import { useGetUserQuery } from './useGetUserQuery';

export const useUserPostsPageMetadata = () => {
  const { userId } = useParams();
  const { state } = useLocation();
  const [fetchUser, setFetchUser] = useState(false);
  const [metadata, setMetadata] = useState<{ user: User | null }>({ user: null });
  const { data, isLoading, error, refetch } = useGetUserQuery({
    userId: userId ?? '',
    enabled: fetchUser,
  });

  useEffect(() => {
    if (state?.user && userId) {
      setFetchUser(false);
      setMetadata({ user: state.user });
    } else if (userId) {
      setFetchUser(true);
    }
  }, [state, userId]);

  useEffect(() => {
    if (data) {
      setMetadata({ user: data });
      setFetchUser(false);
    }
  }, [data]);

  return { metadata, userId, isLoading, error, refetch };
};
