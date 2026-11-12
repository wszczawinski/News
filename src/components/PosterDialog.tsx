import { useState, useEffect, useCallback, type MouseEvent, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { cn } from '@/lib/utils';
import type { Banner } from '@/types';

type GalleryProps = {
  index: number;
  title: string;
  posters: Banner[];
  children: ReactNode;
};

const mediaUrl = import.meta.env.VITE_MEDIA_URL;

const buildMediaUrl = ({ filename }: { filename: string }): string => {
  return `${mediaUrl}/banner/${filename}`;
};

export const PosterDialog = ({ index, title, posters, children }: GalleryProps) => {
  const images = posters.map(file => ({
    id: file.id,
    url: buildMediaUrl({ filename: file.image }),
    link: file.link,
  }));

  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(index);

  const navigateBy = useCallback(
    (delta: number) => {
      if (images.length === 0) return;
      setCurrentIndex(prev => (prev + delta + images.length) % images.length);
    },
    [images.length]
  );

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    if (e.clientX - left < width / 2) {
      navigateBy(-1);
    } else {
      navigateBy(1);
    }
  };

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      setOpen(nextOpen);
      if (nextOpen) setCurrentIndex(index);
    },
    [index]
  );

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateBy(-1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateBy(1);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, navigateBy]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger className='w-full' asChild>
        {children}
      </DialogTrigger>
      <DialogContent className='gap-0' showCloseButton>
        <DialogHeader>
          <DialogTitle className='sr-only'>{title}</DialogTitle>
          <DialogDescription className='sr-only'>Posters</DialogDescription>
        </DialogHeader>

        <div className='w-full'>
          <div
            className={`flex-1 min-w-0 flex justify-center items-center h-[60vh] sm:h-125 md:h-145${images.length > 1 ? ' cursor-pointer' : ''}`}
            onClick={images.length > 1 ? handleClick : undefined}
          >
            <img src={images[currentIndex].url} alt={`Image ${currentIndex + 1}`} className='h-full w-full object-contain rounded' />
          </div>
        </div>

        {(images.length > 1 || images.some(img => img.link)) && (
          <div className='pt-1 text-sm flex items-center'>
            {images.length === 1 ? (
              <div className='flex-1 text-center'>
                {images[currentIndex].link && (
                  <a href={images[currentIndex].link} target='_blank' rel='noopener noreferrer' className='text-sky-600 hover:underline'>
                    Więcej informacji
                  </a>
                )}
              </div>
            ) : (
              <>
                <div className='flex-1'>
                  {images[currentIndex].link && (
                    <a href={images[currentIndex].link} target='_blank' rel='noopener noreferrer' className='text-sky-600 hover:underline'>
                      Więcej informacji
                    </a>
                  )}
                </div>
                <div className='flex items-center gap-2'>
                  <button
                    type='button'
                    aria-label='Previous image'
                    onClick={() => navigateBy(-1)}
                    className={cn(buttonVariants({ variant: 'outline', size: 'icon' }), 'cursor-pointer')}
                  >
                    <ArrowLeft className='h-4 w-4' />
                  </button>
                  <span className='text-muted-foreground'>
                    {currentIndex + 1} / {images.length}
                  </span>
                  <button
                    type='button'
                    aria-label='Next image'
                    onClick={() => navigateBy(1)}
                    className={cn(buttonVariants({ variant: 'outline', size: 'icon' }), 'cursor-pointer')}
                  >
                    <ArrowRight className='h-4 w-4' />
                  </button>
                </div>
                <div className='flex-1' />
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
