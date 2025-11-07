import { useMemo } from 'react';
import { Button } from '../../../shared/components/Button';
import { getUsersTablePageNumbers } from '../utils/getUsersTablePageNumbers';
import { Typography } from '../../../shared/components/Typography';
import type { UsersTablePaginationState } from '../types';

interface PaginationProps {
  handlePageNumberChange: (pageNumber: number) => void;
  paginationState: UsersTablePaginationState;
}

export const Pagination = ({ handlePageNumberChange, paginationState }: PaginationProps) => {
  const { pageNumber, totalPages } = paginationState;
  const hasPreviousPage = pageNumber > 1;
  const hasNextPage = pageNumber < totalPages;

  const handlePreviousPage = () => {
    handlePageNumberChange(pageNumber - 1);
  };
  const handleNextPage = () => {
    handlePageNumberChange(pageNumber + 1);
  };

  const pageNumbers = useMemo(
    () => getUsersTablePageNumbers(totalPages, pageNumber),
    [totalPages, pageNumber],
  );

  return (
    <div className="flex h-full items-end justify-end gap-3">
      <Button
        disabled={!hasPreviousPage}
        variant="pagination-nav"
        direction="previous"
        onClick={handlePreviousPage}
      >
        Previous
      </Button>
      <div className="flex items-center gap-3">
        {pageNumbers.map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <Typography key={`ellipsis-${index}`} variant="body">
                ...
              </Typography>
            );
          }
          return (
            <Button
              key={page}
              variant={pageNumber === page ? 'pagination-active' : 'pagination'}
              onClick={() => handlePageNumberChange(page)}
            >
              {page}
            </Button>
          );
        })}
        {/* <Button variant="pagination-active">1</Button>
        <Button variant="pagination">2</Button>
        <Button variant="pagination">3</Button>
        <Typography variant="body">...</Typography>
        <Button variant="pagination">4</Button>
        <Button variant="pagination">5</Button> */}
      </div>
      <Button
        disabled={!hasNextPage}
        variant="pagination-nav"
        direction="next"
        onClick={handleNextPage}
      >
        Next
      </Button>
    </div>
  );
};
