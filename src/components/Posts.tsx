import { HomePagination } from '@/components/HomePagination';
import type { Paginated, Post } from '@/types';

import { NewsList } from './NewsList';
import { CategorySelect } from './CategorySelect';

export const Posts = ({ paginatedPosts }: { paginatedPosts: Paginated<Post> }) => {
  return (
    <section className='flex flex-col gap-4 min-h-full'>
      <div className='flex sm:hidden w-full flex-col items-start justify-end rounded-md gap-4 sm:flex-row sm:items-center'>
        {/*<HomeBreadcrumbs />*/}
        <CategorySelect />
      </div>
      <div className='grow flex flex-col gap-4'>
        <NewsList posts={paginatedPosts.content} />
      </div>
      <HomePagination />
    </section>
  );
};
