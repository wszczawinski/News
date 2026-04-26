import { useScreenSize } from '@/hooks/useScreenSize';
import type { Media } from '@/types';
import type { ReactNode } from 'react';
import { GalleryDrawer } from './GalleryDrawer';
import { GalleryDialog } from './GalleryDialog';

export type GalleryProps = {
  title: string;
  media: Media;
  startIndex?: number;
  children?: ReactNode;
};

export const Gallery = ({ title, media, startIndex, children }: GalleryProps) => {
  const { isDesktop } = useScreenSize();

  return (
    <>
      {!isDesktop ? (
        <GalleryDrawer title={title} media={media} startIndex={startIndex}>
          {children}
        </GalleryDrawer>
      ) : (
        <GalleryDialog title={title} media={media} startIndex={startIndex}>
          {children}
        </GalleryDialog>
      )}
    </>
  );
};
