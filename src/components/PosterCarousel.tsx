import Autoplay from 'embla-carousel-autoplay';

import type { Banner } from '@/types';

import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';
import { PosterDialog } from './PosterDialog';

type SidebarPosterProps = {
  posters: Banner[];
  title?: string;
  delay?: number;
  hasDots?: boolean;
};

const mediaUrl = import.meta.env.VITE_MEDIA_URL;

export const PosterCarousel = ({ posters, title, delay = 3000, hasDots }: SidebarPosterProps) => {
  const isDots = hasDots ?? posters.length > 1;

  return (
    <article className={`w-full`}>
      <p className='sm:font-medium text-sky-600 pb-1 text-center sm:text-right'>{title}</p>
      <Carousel
        plugins={[
          Autoplay({
            delay: delay,
            stopOnInteraction: false,
          }),
        ]}
        opts={{ loop: true }}
        isDots={isDots}
      >
        <CarouselContent>
          {posters.map((poster, index) => (
            <CarouselItem key={poster.id}>
              <PosterDialog posters={posters} index={index}>
                <img className='rounded-md' src={`${mediaUrl}/banner/${poster.image}`} />
              </PosterDialog>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </article>
  );
};
