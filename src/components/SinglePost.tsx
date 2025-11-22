import type { Post } from '@/types';

import { FormattedDate } from './FormattedDate';
import { GalleryDialog } from './GalleryDialog';
import { BackButton } from './BackButton';

const mediaUrl = import.meta.env.VITE_MEDIA_URL;

export const SinglePost = ({ post }: { post: Post }) => {
  const postContent = post.content.replaceAll('/resources/post_content/', `${mediaUrl}/post_content/`);
  const tumbnailUrl = mediaUrl + '/post/thumbnail/' + post.thumbnail;

  return (
    <div className='space-y-3'>
      <span className='flex flex-row justify-between'>
        <h4 className='text-lg text-sky-600 font-semibold tracking-tight sm:text-xl'>{post.title}</h4>
      </span>

      <div className='flex justify-between'>
        <FormattedDate date={post.createdAt} />
        {post.media && <GalleryDialog media={post.media} title={post.title} />}
      </div>
      <div>
        <img
          className='float-left aspect-22/14 hidden sm:block sm:max-w-[180px] md:max-w-[220px] max-h-[134px] object-cover rounded-xs mr-3 mb-2'
          src={tumbnailUrl}
        />

        <div className='text-sm text-justify space-y-3' dangerouslySetInnerHTML={{ __html: postContent }} />
      </div>

      <div className='flex justify-center'>
        <BackButton />
      </div>
    </div>
  );
};
