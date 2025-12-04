import { useSuspenseQuery } from '@tanstack/react-query';

import { bannersQueryOptions } from '@/services/queries';

import { ProgressiveImage } from './ProgressiveImage';
import { SidebarPoster } from './SidebarPoster';

const mediaUrl = import.meta.env.VITE_MEDIA_URL;

export const NewsBanners = ({ postIndex }: { postIndex: number }) => {
  const { data: banners } = useSuspenseQuery(bannersQueryOptions());
  const banner_post_1 = banners.find(b => b.type === 2);
  const banner_post_2 = banners.find(b => b.type === 3);
  const banner_post_3 = banners.find(b => b.type === 4);

  const banner_local = banners.filter(b => b.type === 5);
  const banner_ads = banners.filter(b => b.type === 6);
  const banner_recomends = banners.filter(b => b.type === 7);

  return (
    <>
      {banner_post_1 && postIndex === 0 && (
        <ProgressiveImage
          className='rounded-sm'
          src={`${mediaUrl}/banner/${banner_post_1.image}`}
          placeholderSrc={`${mediaUrl}/banner/thumbnail/${banner_post_1.imageThumbnail20}`}
          height={banner_post_1.height}
          width={banner_post_1.width}
          alt={banner_post_1.name}
        />
      )}
      {banner_post_2 && postIndex === 1 && (
        <ProgressiveImage
          className='rounded-sm'
          src={`${mediaUrl}/banner/${banner_post_2.image}`}
          placeholderSrc={`${mediaUrl}/banner/thumbnail/${banner_post_2.imageThumbnail20}`}
          height={banner_post_2.height}
          width={banner_post_2.width}
          alt={banner_post_2.name}
        />
      )}
      {banner_post_3 && postIndex === 2 && (
        <>
          <div className='flex flex-row gap-3 sm:hidden'>
            {banner_ads.length && (
              <SidebarPoster
                title='Reklama'
                posters={banner_ads.map(item => ({ imageUrl: `${mediaUrl}/banner/${item.image}` }))}
                delay={8000}
                hasDots={false}
              />
            )}
            {banner_recomends.length && (
              <SidebarPoster
                title='Zapraszamy'
                posters={banner_recomends.map(item => ({ imageUrl: `${mediaUrl}/banner/${item.image}` }))}
                delay={10000}
                hasDots={false}
              />
            )}
            {banner_local.length && (
              <SidebarPoster
                title='Gmina'
                posters={banner_local.map(item => ({ imageUrl: `${mediaUrl}/banner/${item.image}` }))}
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
      {banner_post_3 && postIndex === 3 && (
        <ProgressiveImage
          className='rounded-sm flex sm:hidden'
          src={`${mediaUrl}/banner/${banner_post_3.image}`}
          placeholderSrc={`${mediaUrl}/banner/thumbnail/${banner_post_3.imageThumbnail20}`}
          height={banner_post_3.height}
          width={banner_post_3.width}
          alt={banner_post_3.name}
        />
      )}
    </>
  );
};
