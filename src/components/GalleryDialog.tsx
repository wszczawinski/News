import { useState, useEffect, useRef, type ReactNode, type TouchEvent } from 'react';
import { flushSync } from 'react-dom';
import { ArrowLeft, ArrowRight, GalleryThumbnails } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useScreenSize } from '@/hooks/useScreenSize';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { Media } from '@/types';

type GalleryProps = {
  title: string;
  media: Media;
  startIndex?: number;
  children?: ReactNode;
};

const mediaUrl = import.meta.env.VITE_MEDIA_URL;

type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => void) => void;
};

const buildMediaUrl = ({ folder, filename }: { folder: string; filename: string }): string => {
  return `${mediaUrl}/media/${folder}/${filename}`;
};

export const GalleryDialog = ({ media, title, startIndex, children }: GalleryProps) => {
  const images = media.mediaFiles.map(file => ({
    id: file.file,
    url: buildMediaUrl({ folder: media.folder, filename: file.file }),
    thumbnailUrl: buildMediaUrl({ folder: media.folder + '/thumbnail', filename: file.thumbnail165 }),
  }));

  const { isDesktop } = useScreenSize();
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(startIndex ?? 0);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const scrollThumbnailIntoView = (index: number) => {
    const thumbnailElement = thumbnailRefs.current[index];
    const scrollContainer = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');

    if (thumbnailElement && scrollContainer) {
      const containerRect = scrollContainer.getBoundingClientRect();
      const thumbnailRect = thumbnailElement.getBoundingClientRect();

      const scrollLeft = thumbnailElement.offsetLeft - containerRect.width / 2 + thumbnailRect.width / 2;

      scrollContainer.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: 'smooth',
      });
    }
  };

  const goToPrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    const documentWithTransition = document as DocumentWithViewTransition;
    if (documentWithTransition.startViewTransition) {
      documentWithTransition.startViewTransition(() => {
        flushSync(() => {
          setCurrentIndex(newIndex);
        });
      });
    } else {
      setCurrentIndex(newIndex);
    }
    scrollThumbnailIntoView(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    const documentWithTransition = document as DocumentWithViewTransition;
    if (documentWithTransition.startViewTransition) {
      documentWithTransition.startViewTransition(() => {
        flushSync(() => {
          setCurrentIndex(newIndex);
        });
      });
    } else {
      setCurrentIndex(newIndex);
    }
    scrollThumbnailIntoView(newIndex);
  };

  const goToPreviousMobile = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    const documentWithTransition = document as DocumentWithViewTransition;
    if (documentWithTransition.startViewTransition) {
      documentWithTransition.startViewTransition(() => {
        flushSync(() => {
          setCurrentIndex(newIndex);
        });
      });
    } else {
      setCurrentIndex(newIndex);
    }
  };

  const goToNextMobile = () => {
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    const documentWithTransition = document as DocumentWithViewTransition;
    if (documentWithTransition.startViewTransition) {
      documentWithTransition.startViewTransition(() => {
        flushSync(() => {
          setCurrentIndex(newIndex);
        });
      });
    } else {
      setCurrentIndex(newIndex);
    }
  };

  const handleThumbnailClick = (index: number) => {
    const documentWithTransition = document as DocumentWithViewTransition;
    if (documentWithTransition.startViewTransition) {
      documentWithTransition.startViewTransition(() => {
        flushSync(() => {
          setCurrentIndex(index);
        });
      });
    } else {
      setCurrentIndex(index);
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
        goToPreviousMobile();
      } else {
        goToNextMobile();
      }
    }

    touchStartRef.current = null;
  };

  useEffect(() => {
    if (open) {
      setCurrentIndex(startIndex ?? 0);
      scrollThumbnailIntoView(startIndex ?? 0);
    }
  }, [open]);

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

  return !isDesktop ? (
    <Drawer open={open} onOpenChange={setOpen}>
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
        <p className='sr-only'>
          Image gallery with {images.length} {images.length === 1 ? 'image' : 'images'}
        </p>

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
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button variant='outline' size='sm' className='cursor-pointer'>
            <GalleryThumbnails />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className='md:max-w-4xl' showCloseButton>
        <DialogHeader>
          <DialogTitle className='text-sm line-clamp-1 pr-5'>{title}</DialogTitle>
          <DialogDescription className='sr-only'>
            Image gallery with {images.length} {images.length === 1 ? 'image' : 'images'}
          </DialogDescription>
        </DialogHeader>

        <div className='w-full'>
          <div className='flex items-center gap-2 relative'>
            <Button variant='outline' size='icon' onClick={goToPrevious} className='flex-shrink-0'>
              <ArrowLeft className='h-4 w-4' />
            </Button>

            <div
              className='flex-1 min-w-0 flex justify-center items-center h-96 md:h-[510px]'
              style={{ viewTransitionName: 'gallery-image' }}
            >
              <img src={images[currentIndex].url} alt={`Image ${currentIndex + 1}`} className='h-full w-full object-contain rounded' />
            </div>

            <Button variant='outline' size='icon' onClick={goToNext} className='flex-shrink-0'>
              <ArrowRight className='h-4 w-4' />
            </Button>

            <div className='absolute top-0 right-0 bg-black/60 text-white px-3 py-2 rounded text-sm'>
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>

        {isDesktop && (
          <ScrollArea ref={scrollAreaRef} className='w-[calc(var(--container-4xl)-(--spacing(8)))] whitespace-nowrap'>
            <div className='flex w-max space-x-4 pt-1 pb-2'>
              {images.map((img, index) => (
                <button
                  key={index}
                  ref={el => {
                    thumbnailRefs.current[index] = el;
                  }}
                  className={`h-20 w-24 rounded-sm border-2 ${index === currentIndex ? 'border-2 border-sky-600' : ''}`}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <img src={img.thumbnailUrl} alt={`Thumbnail ${index + 1}`} className='h-full w-full object-cover rounded' />
                </button>
              ))}
            </div>
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};
