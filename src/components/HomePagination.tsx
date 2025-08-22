import { Link, useRouterState } from '@tanstack/react-router';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';

export const HomePagination = () => {
  const { search } = useRouterState({ select: s => s.location });

  const page = search?.page || 1;
  const category = search?.category || 'all';

  return (
    <Pagination>
      <PaginationContent>
        {page === 1 ? (
          <Link disabled to='/'>
            <PaginationItem>
              <PaginationPrevious className='hover:bg-transparent' />
            </PaginationItem>
          </Link>
        ) : (
          <Link to='/news' search={{ page: page - 1, category }}>
            <PaginationItem>
              <PaginationPrevious />
            </PaginationItem>
          </Link>
        )}

        {page > 2 && (
          <>
            <Link to='/news' search={{ page: 1, category }}>
              <PaginationItem>
                <PaginationLink> 1 </PaginationLink>
              </PaginationItem>
            </Link>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}

        <Link disabled to='/news' search={{ page: page, category }}>
          <PaginationItem>
            <PaginationLink isActive className='hover:bg-transparent'>
              {page}
            </PaginationLink>
          </PaginationItem>
        </Link>

        <Link to='/news' search={{ page: page + 1, category }}>
          <PaginationItem>
            <PaginationLink>{page + 1}</PaginationLink>
          </PaginationItem>
        </Link>

        <Link to='/news' search={{ page: page + 2, category }}>
          <PaginationItem>
            <PaginationLink>{page + 2}</PaginationLink>
          </PaginationItem>
        </Link>

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink>
            <Link to='/news' search={{ page: page + 1, category }}>
              <PaginationNext />
            </Link>
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
