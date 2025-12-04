import { useSuspenseQuery } from '@tanstack/react-query';

import { bannersQueryOptions } from '@/services/queries';

import { ProgressiveImage } from './ProgressiveImage';
import { PosterCarousel } from './PosterCarousel';
import { PosterAdd } from './PosterAdd';

const mediaUrl = import.meta.env.VITE_MEDIA_URL;

export const NewsBanners = ({ postIndex }: { postIndex: number }) => {
  const { data: banners } = useSuspenseQuery(bannersQueryOptions());

  const banner_post_1 = banners.find(b => b.type === 2);
  const banner_post_2 = banners.find(b => b.type === 3);
  const banner_post_3 = banners.find(b => b.type === 4);

  const banner_local = banners.filter(b => b.type === 5);
  const banner_ad = banners.find(b => b.type === 6);
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
      {postIndex === 2 && (
        <>
          <div className='flex flex-row gap-3 md:hidden'>
            {banner_ad && <PosterAdd imageUrl={`${mediaUrl}/banner/${banner_ad.image}`} name={banner_ad.name} link={banner_ad.link} />}
            {!!banner_recomends.length && <PosterCarousel title='Zapraszamy' posters={banner_recomends} delay={8000} hasDots={false} />}
            {!!banner_local.length && <PosterCarousel title='Gmina' posters={banner_local} delay={7000} hasDots={false} />}
          </div>
          {banner_post_3 && (
            <ProgressiveImage
              className='rounded-sm hidden md:flex'
              src={`${mediaUrl}/banner/${banner_post_3.image}`}
              placeholderSrc={`${mediaUrl}/banner/thumbnail/${banner_post_3.imageThumbnail20}`}
              height={banner_post_3.height}
              width={banner_post_3.width}
              alt={banner_post_3.name}
            />
          )}
        </>
      )}
      {banner_post_3 && postIndex === 3 && (
        <ProgressiveImage
          className='rounded-sm flex md:hidden'
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
