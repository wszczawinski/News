import { useState } from 'react';
import { ChevronLeft, Home, Images, TextInitial } from 'lucide-react';

import type { Post } from '@/types';
import { useScreenSize } from '@/hooks/useScreenSize';

import { FormattedDate } from './FormattedDate';
import { GalleryDialog } from './GalleryDialog';
import { BackButton } from './BackButton';
import { Button } from './ui/button';

const mediaUrl = import.meta.env.VITE_MEDIA_URL;

const buildMediaUrl = ({ folder, filename }: { folder: string; filename: string }): string => {
  return `${mediaUrl}/media/${folder}/${filename}`;
};

export const SinglePost = ({ post }: { post: Post }) => {
  const [showContent, setShowContent] = useState(true);
  const { isMobile } = useScreenSize();
  const postContent = post.content.replaceAll('/resources/post_content/', `${mediaUrl}/post_content/`);
  const thumbnailUrl = mediaUrl + '/post/thumbnail/' + post.thumbnail;

  const handleShowGallery = () => {
    setShowContent(prev => !prev);
  };

  return (
    <>
      <div className='space-y-3 sm:bg-card sm:shadow-sm sm:rounded-sm sm:border sm:p-4 sm:min-h-64'>
        <span className='flex flex-row justify-between'>
          <h4 className='text-lg text-sky-600 font-semibold tracking-tight sm:text-xl'>{post.title}</h4>
        </span>

        <div className='flex justify-between'>
          {isMobile ? (
            <BackButton>
              <ChevronLeft />
            </BackButton>
          ) : (
            <FormattedDate date={post.createdAt} />
          )}

          {post.media && (
            <div className='flex items-center justify-center gap-2'>
              {!isMobile && <GalleryDialog media={post.media} title={post.title} />}
              <Button variant='outline' size='sm' onClick={handleShowGallery} className='cursor-pointer'>
                {showContent ? <Images /> : <TextInitial />}
              </Button>
            </div>
          )}
        </div>
        <div className='relative'>
          <div
            className={`transition-opacity duration-200 ease-in-out ${
              showContent ? 'opacity-100' : 'opacity-0 pointer-events-none absolute inset-0'
            }`}
          >
            <img
              className='float-left aspect-22/14 hidden sm:block sm:w-[180px] md:w-[220px] max-h-[134px] object-cover rounded-xs mr-3 mb-2'
              src={thumbnailUrl}
              alt='Post thumbnail'
            />

            <div className='text-sm text-justify space-y-3' dangerouslySetInnerHTML={{ __html: postContent }} />
          </div>

          {post.media && (
            <div
              className={`transition-opacity duration-300 ease-in-out ${
                showContent ? 'opacity-0 pointer-events-none absolute inset-0' : 'opacity-100'
              }`}
            >
              <div className='flex flex-wrap gap-5 justify-center'>
                {post.media.mediaFiles.map((image, index) => (
                  <GalleryDialog key={image.thumbnail165} media={post.media} title={post.title} startIndex={index}>
                    <img
                      src={buildMediaUrl({ folder: post.media.folder + '/thumbnail', filename: image.thumbnail165 })}
                      alt={`Thumbnail ${index + 1}`}
                      className='w-[46%] max-w-[165px] object-cover rounded-xs cursor-pointer'
                    />
                  </GalleryDialog>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='flex justify-between sm:justify-center pt-4'>
        {isMobile && <FormattedDate date={post.createdAt} />}
        <BackButton>
          <Home />
        </BackButton>
      </div>
    </>
  );
};
