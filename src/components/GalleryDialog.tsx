import { useState, useEffect, useMemo, useRef, useCallback, type ReactNode, type TouchEvent } from 'react';
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

const buildMediaUrl = ({ folder, filename }: { folder: string; filename: string }): string => {
  return `${mediaUrl}/media/${folder}/${filename}`;
};

export const GalleryDialog = ({ media, title, startIndex, children }: GalleryProps) => {
  const images = useMemo(
    () =>
      media.mediaFiles.map(file => ({
        url: buildMediaUrl({ folder: media.folder, filename: file.file }),
        thumbnailUrl: buildMediaUrl({ folder: media.folder + '/thumbnail', filename: file.thumbnail165 }),
      })),
    [media]
  );

  const { isDesktop } = useScreenSize();
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(startIndex ?? 0);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const scrollViewportRef = useRef<HTMLElement | null>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const currentIndexRef = useRef(startIndex ?? 0);
  const wasOpenRef = useRef(false);

  const getScrollViewport = useCallback(() => {
    if (scrollViewportRef.current && scrollAreaRef.current?.contains(scrollViewportRef.current)) {
      return scrollViewportRef.current;
    }

    const viewport = scrollAreaRef.current?.querySelector<HTMLElement>('[data-radix-scroll-area-viewport]') ?? null;
    scrollViewportRef.current = viewport;

    return viewport;
  }, []);

  const scrollThumbnailIntoView = useCallback(
    (index: number, behavior: ScrollBehavior = 'smooth') => {
      const thumbnailElement = thumbnailRefs.current[index];
      const scrollContainer = getScrollViewport();

      if (thumbnailElement && scrollContainer) {
        const containerWidth = scrollContainer.clientWidth;
        const thumbnailWidth = thumbnailElement.offsetWidth;
        const scrollLeft = thumbnailElement.offsetLeft - containerWidth / 2 + thumbnailWidth / 2;

        scrollContainer.scrollTo({
          left: Math.max(0, scrollLeft),
          behavior,
        });
      }
    },
    [getScrollViewport]
  );

  const setIndexWithTransition = useCallback((newIndex: number) => {
    setCurrentIndex(newIndex);
  }, []);

  const navigateBy = useCallback(
    (delta: number, shouldScrollThumbnail: boolean) => {
      if (images.length === 0) return;

      const newIndex = (currentIndexRef.current + delta + images.length) % images.length;
      currentIndexRef.current = newIndex;
      setIndexWithTransition(newIndex);

      if (shouldScrollThumbnail) {
        scrollThumbnailIntoView(newIndex);
      }
    },
    [images.length, setIndexWithTransition, scrollThumbnailIntoView]
  );

  const goToPrevious = useCallback(() => {
    navigateBy(-1, true);
  }, [navigateBy]);

  const goToNext = useCallback(() => {
    navigateBy(1, true);
  }, [navigateBy]);

  const goToPreviousMobile = useCallback(() => {
    navigateBy(-1, false);
  }, [navigateBy]);

  const goToNextMobile = useCallback(() => {
    navigateBy(1, false);
  }, [navigateBy]);

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      setOpen(nextOpen);

      if (nextOpen) {
        const initialIndex = startIndex ?? 0;
        currentIndexRef.current = initialIndex;
        setCurrentIndex(initialIndex);
      }
    },
    [startIndex]
  );

  const handleThumbnailClick = useCallback(
    (index: number) => {
      currentIndexRef.current = index;
      setIndexWithTransition(index);
    },
    [setIndexWithTransition]
  );

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
    const isOpening = open && !wasOpenRef.current;
    let frameId: number | undefined;

    if (isOpening) {
      if (isDesktop) {
        const initialIndex = startIndex ?? 0;
        frameId = requestAnimationFrame(() => {
          scrollThumbnailIntoView(initialIndex, 'auto');
        });
      }
    }

    wasOpenRef.current = open;
    return () => {
      if (frameId !== undefined) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [open, startIndex, isDesktop, scrollThumbnailIntoView]);

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
  }, [open, goToPrevious, goToNext]);

  return !isDesktop ? (
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
            <Button variant='outline' size='icon' onClick={goToPreviousMobile} className='cursor-pointer'>
              <ArrowLeft className='h-4 w-4' />
            </Button>

            <div className='px-3 py-2 rounded text-sm'>
              {currentIndex + 1} / {images.length}
            </div>

            <Button variant='outline' size='icon' onClick={goToNextMobile} className='cursor-pointer'>
              <ArrowRight className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button variant='outline' size='sm' className='cursor-pointer'>
            <GalleryThumbnails />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className='md:max-w-3xl lg:max-w-4xl sm:pb-2 gap-0' showCloseButton>
        <DialogHeader>
          <DialogTitle className='sr-only text-sm line-clamp-1 pr-5'>{title}</DialogTitle>
          <DialogDescription className='sr-only'>
            Image gallery with {images.length} {images.length === 1 ? 'image' : 'images'}
          </DialogDescription>
        </DialogHeader>

        <div className='w-full'>
          <div
            className='flex-1 min-w-0 flex justify-center items-center h-96 sm:h-[500px] md:h-[580px] relative'
            style={{ viewTransitionName: 'gallery-image' }}
          >
            <button
              type='button'
              aria-label='Previous image'
              tabIndex={-1}
              className='group/left absolute inset-y-0 left-0 z-10 w-1/2 cursor-pointer'
              onClick={goToPrevious}
            >
              <span className='pointer-events-none absolute left-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-md border bg-background/90 opacity-0 transition-opacity group-hover/left:opacity-100'>
                <ArrowLeft className='h-4 w-4' />
              </span>
            </button>
            <button
              type='button'
              aria-label='Next image'
              tabIndex={-1}
              className='group/right absolute inset-y-0 right-0 z-10 w-1/2 cursor-pointer'
              onClick={goToNext}
            >
              <span className='pointer-events-none absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-md border bg-background/90 opacity-0 transition-opacity group-hover/right:opacity-100'>
                <ArrowRight className='h-4 w-4' />
              </span>
            </button>
            <img src={images[currentIndex].url} alt={`Image ${currentIndex + 1}`} className='h-full w-full object-contain rounded' />
          </div>
        </div>
        <div className='pt-1 text-sm text-center text-muted-foreground'>
          {currentIndex + 1} / {images.length}
        </div>

        <ScrollArea
          ref={scrollAreaRef}
          className='md:w-[calc(var(--container-3xl)-(--spacing(8)))] lg:w-[calc(var(--container-4xl)-(--spacing(8)))] whitespace-nowrap'
        >
          <div className='flex w-max space-x-4 pt-1 pb-2'>
            {images.map((img, index) => (
              <button
                key={img.thumbnailUrl}
                ref={el => {
                  thumbnailRefs.current[index] = el;
                }}
                className={`h-18 w-24 rounded-sm border-2 ${index === currentIndex ? 'border-2 border-sky-600' : ''}`}
                onClick={() => handleThumbnailClick(index)}
              >
                <img src={img.thumbnailUrl} alt={`Thumbnail ${index + 1}`} className='h-full w-full object-cover rounded' />
              </button>
            ))}
          </div>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
