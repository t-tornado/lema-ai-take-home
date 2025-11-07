import { useQuery } from '@tanstack/react-query';
import { UserService } from '../services/UserService';
import { type UsersTablePaginationState } from '../types';
import { useEffect, useState } from 'react';
import { PAGE_SIZE, QUERY_KEYS } from '../const';

export const useUsersTableQuery = () => {
  const [fetchUsersCount, setFetchUsersCount] = useState(true);

  const [paginationState, setPaginationState] = useState<UsersTablePaginationState>({
    pageNumber: 1,
    pageSize: PAGE_SIZE,
    totalPages: 0,
  });

  const {
    data: resData,
    isLoading: isLoadingUsers,
    error,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEYS.users, paginationState],
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
    queryKey: [QUERY_KEYS.usersCount],
    queryFn: () => UserService.getUsersCount(),
    enabled: fetchUsersCount,
    select: (data) => data.count,
  });
  const isLoading = isLoadingUsersCount || isLoadingUsers;

  const handlePageNumberChange = (pageNumber: number) => {
    setPaginationState((prev) => ({ ...prev, pageNumber }));
  };

  const refetchData = () => {
    if (!paginationState.totalPages) {
      refetchUsersCount();
    }
    if (!resData?.data) {
      refetch();
    }
  };

  useEffect(() => {
    if (usersCount) {
      setFetchUsersCount(false);
      const totalPages = Math.ceil(usersCount / PAGE_SIZE) ?? 0;
      setPaginationState((prev) => ({
        ...prev,
        totalPages,
      }));
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
