import { Button } from '../../../shared/components/Button';
import { Typography } from '../../../shared/components/Typography';

export const Pagination = () => {
  return (
    <div className="flex h-full items-end justify-end gap-3">
      <Button variant="pagination-nav" direction="previous">
        Previous
      </Button>
      <div className="flex items-center gap-3">
        <Button variant="pagination-active">1</Button>
        <Button variant="pagination">2</Button>
        <Button variant="pagination">3</Button>
        <Typography variant="body">...</Typography>
        <Button variant="pagination">4</Button>
        <Button variant="pagination">5</Button>
      </div>
      <Button variant="pagination-nav" direction="next">
        Next
      </Button>
    </div>
  );
};
