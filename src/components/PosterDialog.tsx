import { useState, useEffect, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import type { Banner } from '@/types';

type GalleryProps = {
  index: number;
  posters: Banner[];
  children: ReactNode;
};

const mediaUrl = import.meta.env.VITE_MEDIA_URL;

const buildMediaUrl = ({ filename }: { filename: string }): string => {
  return `${mediaUrl}/banner/${filename}`;
};

export const PosterDialog = ({ index, posters, children }: GalleryProps) => {
  const images = posters.map(file => ({
    id: file.id,
    url: buildMediaUrl({ filename: file.image }),
  }));

  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(index);

  const goToPrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
  };

  const goToPreviousMobile = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const goToNextMobile = () => {
    setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevious();
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      }
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, currentIndex]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className='w-full' asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogDescription className='sr-only'>Posters</DialogDescription>
        </DialogHeader>

        {/* Main image container */}
        <div className='w-full'>
          <div className='hidden md:flex items-center gap-2 relative'>
            <Button variant='outline' size='icon' onClick={goToPrevious} className='flex-shrink-0'>
              <ArrowLeft className='h-4 w-4' />
            </Button>

            <div className='flex-1 flex justify-center items-center min-w-0'>
              <img
                src={images[currentIndex].url}
                alt={`Image ${currentIndex + 1}`}
                className='max-h-96 max-w-full object-contain rounded md:max-h-[510px]'
              />
            </div>

            <Button variant='outline' size='icon' onClick={goToNext} className='flex-shrink-0'>
              <ArrowRight className='h-4 w-4' />
            </Button>

            <div className='absolute top-0 left-0 bg-black/60 text-white px-3 py-2 rounded text-sm'>
              {currentIndex + 1} / {images.length}
            </div>
          </div>

          {/* Mobile layout - buttons below image */}
          <div className='md:hidden'>
            <div className='flex justify-center items-center'>
              <img
                src={images[currentIndex].url}
                alt={`Image ${currentIndex + 1}`}
                className='max-h-96 max-w-full object-contain rounded'
              />
            </div>

            <div className='flex justify-center items-center gap-4 mt-2'>
              <Button variant='outline' size='icon' onClick={goToPreviousMobile}>
                <ArrowLeft className='h-4 w-4' />
              </Button>

              <div className='px-3 py-2 rounded text-sm'>
                {currentIndex + 1} / {images.length}
              </div>

              <Button variant='outline' size='icon' onClick={goToNextMobile}>
                <ArrowRight className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
