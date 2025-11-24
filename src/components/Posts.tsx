import { CategorySelect } from '@/components/CategorySelect';
import { HomePagination } from '@/components/HomePagination';
import type { Paginated, Post } from '@/types';

import { NewsList } from './NewsList';

export const Posts = ({ paginatedPosts }: { paginatedPosts: Paginated<Post> }) => {
  return (
    <section className='flex flex-col gap-4 min-h-full'>
      <div className='flex w-full flex-col items-start justify-start rounded-md gap-4 sm:flex-row sm:items-center'>
        {/* <HomeBreadcrumbs /> */}
        <CategorySelect />
      </div>
      <div className='grow flex flex-col gap-4'>
        <NewsList posts={paginatedPosts.content} />
      </div>
      <HomePagination />
    </section>
  );
};
