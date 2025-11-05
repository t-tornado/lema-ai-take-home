export const getUsersTablePageNumbers = (
  totalPages: number,
  pageNumber: number,
): (number | 'ellipsis')[] => {
  const pages: (number | 'ellipsis')[] = [];

  if (!totalPages || !pageNumber) {
    return [];
  }

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  pages.push(1);

  if (pageNumber <= 3) {
    for (let i = 2; i <= 5; i++) {
      pages.push(i);
    }
    pages.push('ellipsis');
    pages.push(totalPages);
  } else if (pageNumber >= totalPages - 2) {
    pages.push('ellipsis');
    for (let i = totalPages - 4; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push('ellipsis');
    pages.push(pageNumber - 1);
    pages.push(pageNumber);
    pages.push(pageNumber + 1);
    pages.push('ellipsis');
    pages.push(totalPages);
  }

  return pages;
};
