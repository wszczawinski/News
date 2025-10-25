import * as React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

export const CarouselWithThumbs = ({ images }: { images: string[] }) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleThumbClick = React.useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  return (
    <div className='mx-auto flex-col w-full sm:w-[85%] md:w-[90%] items-center'>
      <Carousel setApi={setApi} className='w-full'>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className='flex p-0 w-full items-center justify-center'>
                  <img className='object-cover min-h-full min-w-full rounded-lg' src={image} />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='hidden sm:flex' />
        <CarouselNext className='hidden sm:flex' />
      </Carousel>
      <Carousel className='mx-auto mt-4 w-full max-w-xs'>
        <CarouselContent className='flex my-1'>
          {images.map((image, index) => (
            <CarouselItem
              key={index}
              className={cn('basis-1/5 cursor-pointer', current === index + 1 ? 'opacity-100' : 'opacity-50')}
              onClick={() => handleThumbClick(index)}
            >
              <Card>
                <CardContent className='p-0 flex aspect-square items-center justify-center'>
                  <img className='object-cover min-h-full min-w-full rounded-lg' src={image} />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='hidden sm:flex' />
        <CarouselNext className='hidden sm:flex' />
      </Carousel>
    </div>
  );
};
