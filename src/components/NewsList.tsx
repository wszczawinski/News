import React from 'react';

import add1 from '@/images/posts_add_1.png';
import add1_small from '@/images/posts_add_1_small.png';
import add2 from '@/images/posts_add_2.png';
import add3 from '@/images/posts_add_3.png';
import type { Post } from '@/types';

import { PostCard } from './PostCard';
import { ProgressiveImage } from './ProgressiveImage';

export const NewsList = ({ posts }: { posts: Post[] }) => {
  return (
    <div className='flex flex-col gap-4 animate-fade-in'>
      {posts?.map((post, index) => (
        <React.Fragment key={post.id}>
         
          {index === 1 &&  <ProgressiveImage
            className='w-full aspect-[4/1] object-cover rounded'
            src={add1}
            placeholderSrc={add1_small}
            alt='logo'
          />}
          {index === 2 && <img className='rounded' src={add2} />}
          {index === 4 && <img className='rounded-lg' src={add3} />}
          <PostCard post={post} />
        </React.Fragment>
      ))}
    </div>
  );
};
