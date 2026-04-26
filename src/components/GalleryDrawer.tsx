import { useState, useMemo, useRef, type TouchEvent } from 'react';
import { ArrowLeft, ArrowRight, GalleryThumbnails } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import type { GalleryProps } from './Gallery';
import { buildMediaUrl } from '@/lib/utils';

export const GalleryDrawer = ({ media, title, startIndex, children }: GalleryProps) => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(startIndex ?? 0);

  const images = useMemo(
    () =>
      media.mediaFiles.map(file => ({
        url: buildMediaUrl({ folder: media.folder, filename: file.file }),
      })),
    [media]
  );

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (nextOpen) {
      setCurrentIndex(startIndex ?? 0);
    }
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (!touchStartRef.current) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const minSwipeDistance = 40;

    // Only treat primarily horizontal moves as gallery swipes.
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    }

    touchStartRef.current = null;
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        {children ? (
          children
        ) : (
          <Button variant='outline' size='sm' className='cursor-pointer'>
            <GalleryThumbnails />
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent className='h-[80vh]'>
        <DrawerTitle className='sr-only'>{title}</DrawerTitle>
        <DrawerDescription className='sr-only'>
          Image gallery with {images.length} {images.length === 1 ? 'image' : 'images'}
        </DrawerDescription>

        <div className='flex-1 min-h-0 px-2 pb-4 flex flex-col'>
          <div
            className='flex-1 min-h-0 w-full flex justify-center items-center overflow-hidden'
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={images[currentIndex].url}
              alt={`Image ${currentIndex + 1}`}
              className='w-full h-full max-w-full max-h-full object-contain object-center'
              style={{ viewTransitionName: 'gallery-image-mobile' }}
            />
          </div>

          <div className='flex justify-center items-center gap-4 mt-auto pt-3'>
            <Button variant='outline' size='icon' onClick={goToPrevious} className='cursor-pointer'>
              <ArrowLeft className='h-4 w-4' />
            </Button>

            <div className='px-3 py-2 rounded text-sm'>
              {currentIndex + 1} / {images.length}
            </div>

            <Button variant='outline' size='icon' onClick={goToNext} className='cursor-pointer'>
              <ArrowRight className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
