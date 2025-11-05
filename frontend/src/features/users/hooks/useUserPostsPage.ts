import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import type { User } from '../types';

export const useUserPostsPageMetadata = () => {
  const { userId } = useParams();
  const { state } = useLocation();
  const [metadata, setMetadata] = useState<{ user: User | null }>({ user: null });

  useEffect(() => {
    if (state?.user && userId) {
      setMetadata({ user: state.user });
    } else if (userId) {
      // fetch users here
    }
  }, [state, userId]);

  return { metadata, userId };
};
