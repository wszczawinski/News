import Autoplay from 'embla-carousel-autoplay';

import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';

type Poster = { imageUrl: string; onClick?: () => void };

type SidebarPosterProps = {
  posters: Poster[];
  title?: string;
  delay?: number;
};

export const SidebarPoster = ({ posters, title, delay = 3000 }: SidebarPosterProps) => {
  const isDots = posters.length > 1;

  return (
    <article className={`w-full`}>
      <p className='font-medium text-sky-600 pb-1 text-right'>{title}</p>
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
          {posters.map(poster => (
            <CarouselItem key={poster.imageUrl} onClick={poster?.onClick}>
              <img className='rounded-lg' src={poster.imageUrl} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </article>
  );
};
