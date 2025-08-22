import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

type Poster = { image: string; onClick?: () => void };

type SidebarPosterProps = {
  posters: Poster[];
  title?: string;
  delay?: number;
};

export const SidebarPoster = ({
  posters,
  title,
  delay = 3000,
}: SidebarPosterProps) => {
  return (
    <article className={`w-full  ${title ? 'h-72' : 'h-64'  } `}>
      <p className="text-l pb-1">{title}</p>
      <Carousel
        plugins={[
          Autoplay({
            delay: delay,
            stopOnInteraction: false,
          }),
        ]}
        opts={{ loop: true }}
        isDots
      >
        <CarouselContent>
          {posters.map((poster) => (
            <CarouselItem key={poster.image} onClick={poster?.onClick}>
              <img className="rounded-lg" src={poster.image} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </article>
  );
};
