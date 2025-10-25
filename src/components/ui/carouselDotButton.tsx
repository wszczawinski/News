import { useCallback, useEffect, useState } from 'react';
import { type EmblaCarouselType } from 'embla-carousel';
import { Circle } from 'lucide-react';

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

const useDotButton = (emblaApi: EmblaCarouselType | undefined): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

type DotButtonsProps = { api: EmblaCarouselType | undefined };

export const DotButtons = ({ api }: DotButtonsProps) => {
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(api);

  return (
    <div className='flex flex-wrap justify-end items-center p-2 gap-2'>
      {scrollSnaps.map((_, index) => (
        <button className='' key={index} onClick={() => onDotButtonClick(index)} type='button'>
          <Circle strokeWidth={3} fill={index === selectedIndex ? '#0284c7' : 'transparent'} className={`h-3 w-3 text-sky-600`} />
        </button>
      ))}
    </div>
  );
};
