import { PageLayout } from '../../../shared/components/PageLayout';
import { Typography } from '../../../shared/components/Typography';
import { UsersTable } from '../components/Table';

export const UsersPage = () => {
  return (
    <PageLayout>
      <Typography variant="heading1" className="px-5 text-3xl lg:text-heading1">
        Users
      </Typography>
      <div className="min-w-0 min-h-0 h-full w-full px-5">
        <UsersTable />
      </div>
    </PageLayout>
  );
};
