import { useSuspenseQuery } from '@tanstack/react-query';

import { bannersQueryOptions } from '@/services/queries';

import { PosterCarousel } from '../PosterCarousel';
import { PosterAdd } from '../PosterAdd';
import { SidebarLinks } from '../SidebarLinks';

const mediaUrl = import.meta.env.VITE_MEDIA_URL;

export const Sidebar = () => {
  const { data: banners } = useSuspenseQuery(bannersQueryOptions());

  const banner_local = banners.filter(b => b.type === 5);
  const banner_ad = banners.find(b => b.type === 6);
  const banner_recomends = banners.filter(b => b.type === 7);

  return (
    <aside className='hidden flex-none md:flex flex-col gap-5 h-full w-44'>
      {banner_ad && <PosterAdd imageUrl={`${mediaUrl}/banner/${banner_ad.image}`} name={banner_ad.name} link={banner_ad.link} />}
      {!!banner_recomends.length && <PosterCarousel title='Zapraszamy' posters={banner_recomends} delay={10000} />}
      {!!banner_local.length && <PosterCarousel title='Gmina' posters={banner_local} delay={7000} />}
      <SidebarLinks />
    </aside>
  );
};
