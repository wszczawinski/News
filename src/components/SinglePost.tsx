import type { Post } from '@/types';

import { FormattedDate } from './FormattedDate';
import { GalleryDialog } from './GalleryDialog';
import { BackButton } from './BackButton';
import { Button } from './ui/button';

export const SinglePost = ({ post }: { post: Post }) => {
  return (
    <div className='space-y-3'>
      <span className='flex flex-row justify-between'>
        <h4 className='text-lg text-sky-600 font-semibold tracking-tight sm:text-xl'>{post.title}</h4>
      </span>

      <div className='flex justify-between'>
        <FormattedDate date={post.createdAt} />
        {post.media && (
          <Button variant='default' size='sm'>
            <GalleryDialog media={post.media} title={post.title} />
          </Button>
        )}
      </div>

      <div className='flex flex-col gap-2 text-sm text-justify' dangerouslySetInnerHTML={{ __html: post.content }} />

      <div className='flex justify-center'>
        <BackButton />
      </div>
    </div>
  );
};
