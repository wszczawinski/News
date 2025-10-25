import { useMemo } from 'react';

import logo from '@/images/logo.png';
import baner1 from '@/images/hero_banner_1.jpg';
import baner1_small from '@/images/hero_banner_1_small.png';
import baner2 from '@/images/hero_banner_2.jpeg';
import baner2_small from '@/images/hero_banner_2_small.jpeg';
import baner3 from '@/images/hero_banner_3.jpeg';
import baner3_small from '@/images/hero_banner_3_small.jpeg';

import { ProgressiveImage } from '../ProgressiveImage';

export const Hero = () => {
  const randomBanner = useMemo(() => {
    const banners = [
      { src: baner1, placeholderSrc: baner1_small },
      { src: baner2, placeholderSrc: baner2_small },
      { src: baner3, placeholderSrc: baner3_small },
    ];
    return banners[Math.floor(Math.random() * banners.length)];
  }, []);

  return (
    <div className='md:px-6 md:bg-gradient-to-t via-[#79BAEF] via-60% from-background to-[#2074AF]'>
      <div className='w-full mx-auto max-w-screen-lg flex flex-row justify-between items-center'>
        <img className='hidden md:block md:h-36 lg:h-40' src={logo} alt='logo' />
        <ProgressiveImage
          className='w-full aspect-[4/1] object-cover md:rounded md:h-[100px] md:w-[400px] lg:h-[120px] lg:w-[480px]'
          src={randomBanner.src}
          placeholderSrc={randomBanner.placeholderSrc}
          height={120}
          alt='logo'
        />
      </div>
    </div>
  );
};
