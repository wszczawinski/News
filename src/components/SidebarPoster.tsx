import Autoplay from 'embla-carousel-autoplay';

import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';

type Poster = { imageUrl: string; onClick?: () => void };

type SidebarPosterProps = {
  posters: Poster[];
  title?: string;
  delay?: number;
  hasDots?: boolean;
};

export const SidebarPoster = ({ posters, title, delay = 3000, hasDots }: SidebarPosterProps) => {
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
