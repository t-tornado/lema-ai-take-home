import { useEffect, useState } from 'react';
import type { UserTableState } from '../types';

const data = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St, Anytown, USA, 12345',
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    address: '123 Main St, Anytown, USA, 12345',
  },
  {
    id: 3,
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St, Anytown, USA, 12345',
  },
  {
    id: 4,
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St, Anytown, USA, 12345',
  },
  {
    id: 5,
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St, Anytown, USA, 12345',
  },
  {
    id: 6,
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    address: '123 Main St, Anytown, USA, 12345',
  },
  {
    id: 7,
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St, Anytown, USA, 12345',
  },
  {
    id: 8,
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St, Anytown, USA, 12345',
  },
  {
    id: 9,
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St, Anytown, USA, 12345',
  },
  {
    id: 10,
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    address: '123 Main St, Anytown, USA, 12345',
  },
  {
    id: 11,
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St, Anytown, USA, 12345',
  },
  {
    id: 12,
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St, Anytown, USA, 12345',
  },
  {
    id: 13,
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St, Anytown, USA, 12345',
  },
  {
    id: 14,
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    address: '123 Main St, Anytown, USA, 12345',
  },
  {
    id: 15,
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St, Anytown, USA, 12345',
  },
  {
    id: 16,
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St, Anytown, USA, 12345',
  },
  {
    id: 17,
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St, Anytown, USA, 12345',
  },
  {
    id: 18,
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    address: '123 Main St, Anytown, USA, 12345',
  },
  {
    id: 19,
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St, Anytown, USA, 12345',
  },
  {
    id: 20,
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St, Anytown, USA, 12345',
  },
];

export const useUsersTable = () => {
  const [state, setState] = useState<UserTableState>({
    isLoading: false,
    error: null,
    data: [],
    totalUsers: 0,
    pageNumber: 0,
    pageSize: 0,
    totalPages: 0,
    currentPage: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    nextPage: 0,
    previousPage: 0,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      setState({
        ...state,
        isLoading: true,
      });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setState({
        ...state,
        data: data,
        totalUsers: data.length,
        totalPages: Math.ceil(data.length / state.pageSize),
        currentPage: state.pageNumber,
        hasNextPage: state.pageNumber < state.totalPages - 1,
        hasPreviousPage: state.pageNumber > 0,
      });
    };
    fetchUsers();
  }, []);

  return {
    state,
  };
};
