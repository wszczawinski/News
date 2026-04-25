import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { ArrowLeft, ArrowRight, GalleryThumbnails } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { buildMediaUrl } from '@/lib/utils';

import type { GalleryProps } from './Gallery';

export const GalleryDialog = ({ media, title, startIndex, children }: GalleryProps) => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(startIndex ?? 0);

  const images = useMemo(
    () =>
      media.mediaFiles.map(file => ({
        url: buildMediaUrl({ folder: media.folder, filename: file.file }),
        thumbnailUrl: buildMediaUrl({ folder: media.folder + '/thumbnail', filename: file.thumbnail165 }),
      })),
    [media]
  );

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const scrollThumbnailIntoView = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    const thumbnailElement = thumbnailRefs.current[index];
    const scrollContainer = scrollAreaRef.current?.querySelector<HTMLElement>('[data-radix-scroll-area-viewport]') ?? null;

    if (thumbnailElement && scrollContainer) {
      const containerWidth = scrollContainer.clientWidth;
      const thumbnailWidth = thumbnailElement.offsetWidth;
      const scrollLeft = thumbnailElement.offsetLeft - containerWidth / 2 + thumbnailWidth / 2;

      scrollContainer.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior,
      });
    }
  }, []);

  const navigateBy = useCallback(
    (delta: number) => {
      if (images.length === 0) return;
      setCurrentIndex(prev => (prev + delta + images.length) % images.length);
    },
    [images.length]
  );

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      setOpen(nextOpen);
      if (nextOpen) {
        setCurrentIndex(startIndex ?? 0);
      }
    },
    [startIndex]
  );

  useEffect(() => {
    if (!open) return;
    scrollThumbnailIntoView(currentIndex);
  }, [currentIndex, open, scrollThumbnailIntoView]);

  useEffect(() => {
    if (!open) return;
    const frameId = requestAnimationFrame(() => {
      scrollThumbnailIntoView(startIndex ?? 0, 'auto');
    });
    return () => cancelAnimationFrame(frameId);
  }, [open, startIndex, scrollThumbnailIntoView]);

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
              onClick={() => navigateBy(-1)}
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
              onClick={() => navigateBy(1)}
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
                onClick={() => setCurrentIndex(index)}
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
