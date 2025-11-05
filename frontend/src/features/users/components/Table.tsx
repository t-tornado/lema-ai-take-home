import { useCallback } from 'react';
import { Loader } from '../../../shared/components/Loader';
import { Typography } from '../../../shared/components/Typography';
import { useUsersTableQuery } from '../hooks/useUsersTableQuery';
import { useUserTableActions } from '../hooks/useUserTableActions';
import type { User } from '../types';
import { Pagination } from './Pagination';
import { Button } from '../../../shared/components/Button';

export const UsersTable = () => {
  const { data, isLoading, error, handlePageNumberChange, paginationState, refetchData } =
    useUsersTableQuery();
  const { viewUserPosts } = useUserTableActions();

  const dataIsLoading = isLoading;
  const dataIsError = error;
  const dataIsReady = !dataIsLoading && !dataIsError && (data?.length ?? 0) > 0;
  const dataIsEmpty = !dataIsLoading && !dataIsError && (data?.length ?? 0) === 0;

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
            {dataIsLoading && (
              <tr>
                <td colSpan={3} className="h-[200px]">
                  <div className="h-full flex items-center justify-center">
                    <Loader color="gray" />
                  </div>
                </td>
              </tr>
            )}
            {dataIsReady &&
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
            {dataIsEmpty && (
              <tr>
                <td colSpan={3} className="h-[200px]">
                  <div className="h-full flex gap-y-2 items-center justify-center">
                    <Typography variant="body" className="text-faded">
                      No data found
                    </Typography>
                  </div>
                </td>
              </tr>
            )}
            {dataIsError && (
              <tr>
                <td colSpan={3} className="h-[200px]">
                  <div className="h-full flex flex-col gap-y-2 items-center justify-center">
                    <Typography variant="body" className="text-red-300">
                      Error fetching data. Please try again.
                    </Typography>
                    <Button variant="primary" className="bg-red-400" onClick={refetchData}>
                      Try again
                    </Button>
                  </div>
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
