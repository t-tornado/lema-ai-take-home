import { Typography } from '../../shared/components/Typography';
import { UsersTable } from './components/Table';

export const UsersPage = () => {
  return (
    <div className="!w-7xl h-full mx-auto pt-[132px] flex flex-col gap-8 pb-16">
      <Typography variant="heading1">Users</Typography>
      <div className="min-w-0 min-h-0 w-full h-full">
        <UsersTable />
      </div>
    </div>
  );
};
