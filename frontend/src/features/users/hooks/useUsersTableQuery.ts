import { useQuery } from '@tanstack/react-query';
import { UserService } from '../services/UserService';
import { type UsersTablePaginationState } from '../types';
import { useEffect, useState } from 'react';

const PAGE_SIZE = 4;
export const useUsersTableQuery = () => {
  const [paginationState, setPaginationState] = useState<UsersTablePaginationState>({
    pageNumber: 1,
    pageSize: PAGE_SIZE,
    totalUsers: 0,
  });

  const {
    data: resData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users', paginationState],
    queryFn: () =>
      UserService.getUsers({
        pageNumber: paginationState.pageNumber,
        pageSize: paginationState.pageSize,
      }),
  });

  const handlePageNumberChange = (pageNumber: number) => {
    setPaginationState((prev) => ({ ...prev, pageNumber }));
  };

  useEffect(() => {
    if (!isLoading && !error && resData?.totalUsers !== paginationState.totalUsers) {
      setPaginationState((prev) => ({ ...prev, totalUsers: resData?.totalUsers ?? 0 }));
    }
  }, [resData, isLoading, error, paginationState.totalUsers]);

  return {
    data: resData?.data,
    isLoading,
    error,
    handlePageNumberChange,
    paginationState,
  };
};
