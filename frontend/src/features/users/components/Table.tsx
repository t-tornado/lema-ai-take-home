import { useCallback } from 'react';
import { Loader } from '../../../shared/components/Loader';
import { Typography } from '../../../shared/components/Typography';
import { useUsersTableQuery } from '../hooks/useUsersTableQuery';
import { useUserTableActions } from '../hooks/useUserTableActions';
import type { User } from '../types';
import { Pagination } from './Pagination';

export const UsersTable = () => {
  const { data, isLoading, error, handlePageNumberChange, paginationState } = useUsersTableQuery();
  const { viewUserPosts } = useUserTableActions();

  const getAddressStr = useCallback((user: User) => {
    const address = user.address;
    if (!address) return '';
    const { street, state, city, zipcode } = address;
    return `${street}, ${state}, ${city}, ${zipcode}`;
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full relative min-h-0 border border-separate border-faded border-solid rounded-[8px] overflow-y-auto">
        <table className="w-full h-auto table-auto">
          <thead className="h-11 sticky top-0 bg-white z-10">
            <tr className="border-b border-faded border-solid">
              <th className="text-faded text-body text-left p-3">Full Name</th>
              <th className="text-faded text-body text-left p-3">Email Address</th>
              <th className="w-[392px] text-faded text-body text-left p-3">Address</th>
            </tr>
          </thead>
          <tbody className="h-auto overflow-y-auto">
            {isLoading && (
              <tr className="absolute top-[50%] flex items-center justify-center w-full h-full left-[50%] transform -translate-x-1/2 -translate-y-1/2">
                <td>
                  <Loader color="gray" />
                </td>
              </tr>
            )}
            {(data?.length ?? 0) > 0 &&
              data?.map((user: User) => (
                <tr
                  onClick={() => viewUserPosts(user)}
                  key={user.id}
                  className="!h-11 cursor-pointer hover:bg-gray-100 border-b border-faded border-solid"
                >
                  <td className="text-text-default text-body text-left p-3 ">{user.name}</td>
                  <td className="text-text-default text-body text-left p-3 truncate">
                    {user.email}
                  </td>
                  <td className="text-text-default text-body text-left p-3 max-w-[392px] truncate">
                    {getAddressStr(user)}
                  </td>
                </tr>
              ))}
            {!isLoading && !error && (data?.length ?? 0) === 0 && (
              <tr className="absolute top-[50%] flex items-center justify-center w-full h-full left-[50%] transform -translate-x-1/2 -translate-y-1/2">
                <td>
                  <Typography variant="body" className="text-faded">
                    No data found
                  </Typography>
                </td>
              </tr>
            )}
            {!isLoading && error && (data?.length ?? 0) === 0 && (
              <tr className="absolute top-[50%] flex items-center justify-center w-full h-full left-[50%] transform -translate-x-1/2 -translate-y-1/2">
                <td>
                  <Typography variant="body" className="text-red-300">
                    Error fetching data. Please try again.
                  </Typography>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="w-full h-[60px] pb-2 flex flex-col">
        <Pagination
          pageNumber={paginationState.pageNumber}
          handlePageNumberChange={handlePageNumberChange}
          totalPages={paginationState.totalUsers}
        />
      </div>
    </div>
  );
};
