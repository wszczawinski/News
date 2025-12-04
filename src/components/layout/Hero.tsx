import { useSuspenseQuery } from '@tanstack/react-query';

import logo from '@/images/logo.png';
import { bannersQueryOptions } from '@/services/queries';

import { ProgressiveImage } from '../ProgressiveImage';

const mediaUrl = import.meta.env.VITE_MEDIA_URL;

export const Hero = () => {
  const { data: banners } = useSuspenseQuery(bannersQueryOptions());
  const banner = banners.find(b => b.type === 1);

  return (
    <div className='md:px-6 md:bg-gradient-to-t via-[#79BAEF] via-60% from-background to-[#2074AF]'>
      <div className='w-full mx-auto max-w-screen-lg flex flex-row justify-between items-center'>
        <img className='hidden md:block md:h-40 md:mb-[-28px]' src={logo} alt='logo' />
        {banner && (
          <ProgressiveImage
            className='w-full md:rounded md:h-[75px] md:w-[375px] lg:h-[100px] lg:w-[500px]'
            src={`${mediaUrl}/banner/${banner.image}`}
            placeholderSrc={`${mediaUrl}/banner/thumbnail/${banner.imageThumbnail20}`}
            height={banner.height}
            width={banner.width}
            alt={banner.name}
          />
        )}
      </div>
    </div>
  );
};
