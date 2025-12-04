import { useSuspenseQuery } from '@tanstack/react-query';

import { bannersQueryOptions } from '@/services/queries';

import { SidebarPoster } from '../SidebarPoster';

const mediaUrl = import.meta.env.VITE_MEDIA_URL;

export const Sidebar = () => {
  const { data: banners } = useSuspenseQuery(bannersQueryOptions());

  const local = banners.filter(b => b.type === 5);
  const ads = banners.filter(b => b.type === 6);
  const recomends = banners.filter(b => b.type === 7);

  return (
    <aside className='hidden flex-none md:flex flex-col gap-5 h-full w-44'>
      {ads.length && (
        <SidebarPoster title='Reklama' posters={ads.map(item => ({ imageUrl: `${mediaUrl}/banner/${item.image}` }))} delay={8000} />
      )}
      {recomends.length && (
        <SidebarPoster
          title='Zapraszamy'
          posters={recomends.map(item => ({ imageUrl: `${mediaUrl}/banner/${item.image}` }))}
          delay={10000}
        />
      )}
      {local.length && (
        <SidebarPoster title='Gmina' posters={local.map(item => ({ imageUrl: `${mediaUrl}/banner/${item.image}` }))} delay={7000} />
      )}
    </aside>
  );
};
