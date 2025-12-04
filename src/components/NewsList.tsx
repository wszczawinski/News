import React from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import type { Post } from '@/types';
import { bannersQueryOptions } from '@/services/queries';

import { PostCard } from './PostCard';
import { ProgressiveImage } from './ProgressiveImage';
import { SidebarPoster } from './SidebarPoster';

const mediaUrl = import.meta.env.VITE_MEDIA_URL;

export const NewsList = ({ posts }: { posts: Post[] }) => {
  const { data: banners } = useSuspenseQuery(bannersQueryOptions());
  const banner_post_1 = banners.find(b => b.type === 2);
  const banner_post_2 = banners.find(b => b.type === 3);
  const banner_post_3 = banners.find(b => b.type === 4);

  const local = banners.filter(b => b.type === 5);
  const ads = banners.filter(b => b.type === 6);
  const recomends = banners.filter(b => b.type === 7);

  return (
    <div className='flex flex-col gap-4 animate-fade-in'>
      {posts?.map((post, index) => (
        <React.Fragment key={post.id}>
          {banner_post_1 && index === 1 && (
            <ProgressiveImage
              className='rounded-sm'
              src={`${mediaUrl}/banner/${banner_post_1.image}`}
              placeholderSrc={`${mediaUrl}/banner/thumbnail/${banner_post_1.imageThumbnail20}`}
              height={banner_post_1.height}
              width={banner_post_1.width}
              alt={banner_post_1.name}
            />
          )}
          {banner_post_2 && index === 2 && (
            <ProgressiveImage
              className='rounded-sm'
              src={`${mediaUrl}/banner/${banner_post_2.image}`}
              placeholderSrc={`${mediaUrl}/banner/thumbnail/${banner_post_2.imageThumbnail20}`}
              height={banner_post_2.height}
              width={banner_post_2.width}
              alt={banner_post_2.name}
            />
          )}
          {banner_post_3 && index === 3 && (
            <>
              <div className='flex flex-row gap-3 sm:hidden'>
                {ads.length && (
                  <SidebarPoster
                    title='Reklama'
                    posters={ads.map(item => ({ imageUrl: `${mediaUrl}/banner/${item.image}` }))}
                    delay={8000}
                    hasDots={false}
                  />
                )}
                {recomends.length && (
                  <SidebarPoster
                    title='Zapraszamy'
                    posters={recomends.map(item => ({ imageUrl: `${mediaUrl}/banner/${item.image}` }))}
                    delay={10000}
                    hasDots={false}
                  />
                )}
                {local.length && (
                  <SidebarPoster
                    title='Gmina'
                    posters={local.map(item => ({ imageUrl: `${mediaUrl}/banner/${item.image}` }))}
                    delay={7000}
                    hasDots={false}
                  />
                )}
              </div>
              <ProgressiveImage
                className='rounded-sm hidden sm:flex'
                src={`${mediaUrl}/banner/${banner_post_3.image}`}
                placeholderSrc={`${mediaUrl}/banner/thumbnail/${banner_post_3.imageThumbnail20}`}
                height={banner_post_3.height}
                width={banner_post_3.width}
                alt={banner_post_3.name}
              />
            </>
          )}
          {banner_post_3 && index === 4 && (
            <ProgressiveImage
              className='rounded-sm flex sm:hidden'
              src={`${mediaUrl}/banner/${banner_post_3.image}`}
              placeholderSrc={`${mediaUrl}/banner/thumbnail/${banner_post_3.imageThumbnail20}`}
              height={banner_post_3.height}
              width={banner_post_3.width}
              alt={banner_post_3.name}
            />
          )}
          <PostCard post={post} />
        </React.Fragment>
      ))}
    </div>
  );
};
