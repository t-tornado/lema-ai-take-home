import { useQuery } from '@tanstack/react-query';
import { UserService } from '../services/UserService';
import { type UsersTablePaginationState } from '../types';
import { useEffect, useState } from 'react';

const PAGE_SIZE = 4;
export const useUsersTableQuery = () => {
  const [fetchUsersCount, setFetchUsersCount] = useState(true);

  const [paginationState, setPaginationState] = useState<UsersTablePaginationState>({
    pageNumber: 1,
    pageSize: PAGE_SIZE,
    totalUsers: 0,
  });

  const {
    data: resData,
    isLoading: isLoadingUsers,
    error,
    refetch,
  } = useQuery({
    queryKey: ['users', paginationState],
    queryFn: () =>
      UserService.getUsers({
        pageNumber: paginationState.pageNumber,
        pageSize: paginationState.pageSize,
      }),
  });

  const {
    data: usersCount,
    isLoading: isLoadingUsersCount,
    refetch: refetchUsersCount,
  } = useQuery({
    queryKey: ['users-count'],
    queryFn: () => UserService.getUsersCount(),
    enabled: fetchUsersCount,
    select: (data) => data.count,
  });
  const isLoading = isLoadingUsersCount || isLoadingUsers;

  const handlePageNumberChange = (pageNumber: number) => {
    setPaginationState((prev) => ({ ...prev, pageNumber }));
  };

  const refetchData = () => {
    if (!paginationState.totalUsers) {
      refetchUsersCount();
    }
    if (!resData?.data) {
      refetch();
    }
  };

  useEffect(() => {
    if (usersCount) {
      setFetchUsersCount(false);
      setPaginationState((prev) => ({ ...prev, totalUsers: usersCount ?? 0 }));
    }
  }, [usersCount]);

  return {
    data: resData?.data,
    isLoading,
    error,
    handlePageNumberChange,
    paginationState,
    refetchData,
  };
};
