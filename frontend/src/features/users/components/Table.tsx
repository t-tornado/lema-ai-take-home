import { Loader } from '../../../shared/components/Loader';
import { Typography } from '../../../shared/components/Typography';
import { useUsersTable } from '../hooks/useUsersTable';
import { useUserTableActions } from '../hooks/useUserTableActions';
import { Pagination } from './Pagination';

export const UsersTable = () => {
  const { state } = useUsersTable();
  const { viewUserPosts } = useUserTableActions();

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full relative flex-1 min-h-0 border border-separate border-faded border-solid rounded-[8px] overflow-y-auto">
        <table className="w-full h-auto table-auto">
          <thead className="h-11 sticky top-0 bg-white z-10">
            <tr className="border-b border-faded border-solid">
              <th className="text-faded text-body text-left p-3">Full Name</th>
              <th className="text-faded text-body text-left p-3">Email Address</th>
              <th className="w-[392px] text-faded text-body text-left p-3">Address</th>
            </tr>
          </thead>
          <tbody className="h-auto overflow-y-auto">
            {state.isLoading && (
              <div className="absolute top-[50%] flex items-center justify-center w-full h-full left-[50%] transform -translate-x-1/2 -translate-y-1/2">
                <Loader color="gray" />
              </div>
            )}
            {state.data.length > 0 &&
              state.data.map((item) => (
                <tr
                  onClick={() => viewUserPosts(item)}
                  key={item.name}
                  className="!h-11 cursor-pointer hover:bg-gray-100 border-b border-faded border-solid"
                >
                  <td className="text-text-default text-body text-left p-3">{item.name}</td>
                  <td className="text-text-default text-body text-left p-3">{item.email}</td>
                  <td className="text-text-default text-body text-left p-3">{item.address}</td>
                </tr>
              ))}
            {!state.isLoading && !state.error && state.data.length === 0 && (
              <div className="absolute top-[50%] flex items-center justify-center w-full h-full left-[50%] transform -translate-x-1/2 -translate-y-1/2">
                <Typography variant="body" className="text-faded">
                  No data found
                </Typography>
              </div>
            )}
            {!state.isLoading && state.error && state.data.length === 0 && (
              <div className="absolute top-[50%] flex items-center justify-center w-full h-full left-[50%] transform -translate-x-1/2 -translate-y-1/2">
                <Typography variant="body" className="text-red-300">
                  Error fetching data. Please try again.
                </Typography>
              </div>
            )}
          </tbody>
        </table>
      </div>
      <div className="w-full h-[60px] pb-2 flex flex-col">
        {!state.isLoading && !state.error && state.data.length > 0 && <Pagination />}
      </div>
    </div>
  );
};
