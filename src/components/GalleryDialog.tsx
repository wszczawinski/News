import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { Media } from '@/types';

type GalleryProps = {
  title: string;
  media: Media;
};

const mediaUrl = import.meta.env.VITE_MEDIA_URL;

const buildMediaUrl = ({ folder, filename }: { folder: string; filename: string }): string => {
  return `${mediaUrl}/media/${folder}/${filename}`;
};

export const GalleryDialog = ({ media, title }: GalleryProps) => {
  const images = media.mediaFiles.map(file => ({
    id: file.file,
    url: buildMediaUrl({ folder: media.folder, filename: file.file }),
    thumbnailUrl: buildMediaUrl({ folder: media.folder + '/thumbnail', filename: file.thumbnail165 }),
  }));

  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

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
    setCurrentIndex(newIndex);
    scrollThumbnailIntoView(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    scrollThumbnailIntoView(newIndex);
  };

  const goToPreviousMobile = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const goToNextMobile = () => {
    setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (open) {
      setCurrentIndex(0);
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'>
          Gallery
        </Button>
      </DialogTrigger>
      <DialogContent className='md:max-w-3xl'>
        <DialogHeader>
          <DialogTitle className='text-sm line-clamp-1 pr-5'>{title}</DialogTitle>
          <DialogDescription className='sr-only'>
            Image gallery with {images.length} {images.length === 1 ? 'image' : 'images'}
          </DialogDescription>
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
                className='max-h-96 max-w-full object-contain rounded'
              />
            </div>

            <Button variant='outline' size='icon' onClick={goToNext} className='flex-shrink-0'>
              <ArrowRight className='h-4 w-4' />
            </Button>

            <div className='absolute top-0 right-0 bg-black/60 text-white px-3 py-2 rounded text-sm'>
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

        <ScrollArea ref={scrollAreaRef} className='hidden md:block md:w-[calc(var(--container-3xl)-(--spacing(12)))] whitespace-nowrap'>
          <div className='flex w-max space-x-4 pt-4 pb-1'>
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
      </DialogContent>
    </Dialog>
  );
};
