import type { ReactNode } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { bannersQueryOptions } from '@/services/queries';
import { useScreenSize } from '@/hooks/useScreenSize';
import type { Banner } from '@/types';

import { ProgressiveImage } from './ProgressiveImage';
import { PosterCarousel } from './PosterCarousel';
import { PosterAdd } from './PosterAdd';

const mediaUrl = import.meta.env.VITE_MEDIA_URL;

type BannerPostersProps = { ad?: Banner; recommends: Banner[]; local: Banner[] };

const BannerPosters = ({ ad, recommends, local }: BannerPostersProps) => (
  <div className='flex flex-row gap-3'>
    {ad && <PosterAdd imageUrl={`${mediaUrl}/banner/${ad.image}`} name={ad.name} link={ad.link} />}
    {!!recommends.length && <PosterCarousel title='Zapraszamy' posters={recommends} delay={8000} hasDots={false} />}
    {!!local.length && <PosterCarousel title='Gmina' posters={local} delay={7000} hasDots={false} />}
  </div>
);

const BannerImage = ({ banner, className = '' }: { banner: Banner; className?: string }) => (
  <ProgressiveImage
    className={`rounded-sm ${className}`.trim()}
    src={`${mediaUrl}/banner/${banner.image}`}
    placeholderSrc={`${mediaUrl}/banner/thumbnail/${banner.imageThumbnail20}`}
    height={banner.height}
    width={banner.width}
    link={banner.link}
    alt={banner.name}
  />
);

export const NewsListBanner = ({ postIndex }: { postIndex: number }) => {
  const { data: banners } = useSuspenseQuery(bannersQueryOptions());
  const { isMobile } = useScreenSize();

  const banner_post_1 = banners.find(b => b.type === 2);
  const banner_post_2 = banners.find(b => b.type === 3);
  const banner_post_3 = banners.find(b => b.type === 4);

  const banner_local = banners.filter(b => b.type === 5);
  const banner_ad = banners.find(b => b.type === 6);
  const banner_recommends = banners.filter(b => b.type === 7);

  const bannerByIndex: Record<number, ReactNode> = {
    0: banner_post_1 && <BannerImage banner={banner_post_1} />,
    1: banner_post_2 && <BannerImage banner={banner_post_2} />,
    2: (
      <>
        {isMobile ? (
          <BannerPosters ad={banner_ad} recommends={banner_recommends} local={banner_local} />
        ) : (
          banner_post_3 && <BannerImage banner={banner_post_3} />
        )}
      </>
    ),
    3: <>{isMobile && banner_post_3 && <BannerImage banner={banner_post_3} />}</>,
  };

  return <>{bannerByIndex[postIndex]}</>;
};
