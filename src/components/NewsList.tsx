import React from 'react';

import { HomePagination } from '@/components/HomePagination';
import type { Paginated, Post } from '@/types';

import { CategorySelect } from './CategorySelect';
import { PostCard } from './PostCard';
import { NewsListBanner } from './NewsListBanner.tsx';

export const NewsList = ({ paginatedPosts }: { paginatedPosts: Paginated<Post> }) => {
  return (
    <section className='flex flex-col gap-4 min-h-full'>
      <div className='flex sm:hidden w-full flex-col items-start justify-end rounded-md gap-4 sm:flex-row sm:items-center'>
        <CategorySelect />
      </div>

      <div className='flex flex-col grow gap-4 animate-fade-in'>
        {paginatedPosts?.content?.map((post, index) => (
          <React.Fragment key={post.id}>
            <PostCard post={post} />

            <NewsListBanner postIndex={index} />
          </React.Fragment>
        ))}
      </div>

      <HomePagination />
    </section>
  );
};
