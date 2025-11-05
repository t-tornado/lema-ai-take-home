import { Button } from '../../shared/components/Button';
import { Input } from '../../shared/components/Input';
import { Textarea } from '../../shared/components/Textarea';
import { Typography } from '../../shared/components/Typography';

export const UsersPage = () => {
  return (
    <div>
      <Typography variant="heading1">Users Page</Typography>
      <Button variant="primary" isLoading>
        Primary
      </Button>
      <Button variant="pagination">1</Button>
      <Button variant="pagination-active">2</Button>
      <Input label="Name" />
      <Textarea label="Description" />
    </div>
  );
};
