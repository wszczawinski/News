import { useSuspenseQuery } from '@tanstack/react-query';

import { bannersQueryOptions } from '@/services/queries';

import { PosterCarousel } from '../PosterCarousel';
import { SidebarLinks } from '../SidebarLinks';

export const Sidebar = () => {
  const { data: banners } = useSuspenseQuery(bannersQueryOptions());

  const banner_local = banners.filter(b => b.type === 5);
  const banner_ad = banners.find(b => b.type === 6);
  const banner_recomends = banners.filter(b => b.type === 7);

  return (
    <aside className='hidden flex-none md:flex flex-col gap-5 h-full w-44'>
      {banner_ad && <PosterCarousel title='Reklama' posters={[banner_ad]} delay={7000} hasDots={false} />}
      {!!banner_local.length && <PosterCarousel title='Gmina' posters={banner_local} delay={7000} />}
      {!!banner_recomends.length && <PosterCarousel title='Zapraszamy' posters={banner_recomends} delay={10000} />}
      <SidebarLinks />
    </aside>
  );
};
