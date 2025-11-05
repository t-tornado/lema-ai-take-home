import { useQuery } from '@tanstack/react-query';
import { UserService } from '../services/UserService';
import { type User, type UsersTablePaginationState } from '../types';
import { useEffect, useState } from 'react';

const PAGE_SIZE = 4;
export const useUsersTableQuery = () => {
  const [paginationState, setPaginationState] = useState<UsersTablePaginationState>({
    pageNumber: 1,
    pageSize: PAGE_SIZE,
    totalPages: 0,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['users', paginationState],
    queryFn: () =>
      UserService.getUsers({
        pageNumber: paginationState.pageNumber,
        pageSize: paginationState.pageSize,
      }),
    select: (data) => {
      console.log('AAA', data);
      return (data as unknown as { data: User[] }).data;
    },
  });

  useEffect(() => {
    if (!isLoading && !error && data) {
      setPaginationState((prev) => ({ ...prev, totalPages: data.length }));
    }
  }, [data, isLoading, error]);

  const handlePageNumberChange = (pageNumber: number) => {
    setPaginationState((prev) => ({ ...prev, pageNumber }));
  };

  return {
    data,
    isLoading,
    error,
    handlePageNumberChange,
    paginationState,
  };
};
