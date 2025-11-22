import { ChevronRight } from 'lucide-react';
import { Link } from '@tanstack/react-router';

import type { Post } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { FormattedDate } from './FormattedDate';
import { buttonVariants } from './ui/buttonVariants';

const mediaUrl = import.meta.env.VITE_MEDIA_URL;

export const PostCard = ({ post }: { post: Post }) => {
  const tumbnailUrl = mediaUrl + '/post/thumbnail/' + post.thumbnail;

  return (
    <Card key={post.id} className='rounded-sm max-h-[162px]'>
      <div className='flex flex-row'>
        <Link to='/post/$postId' params={{ postId: post.id }}>
          <img
            className='aspect-22/16 max-w-[120px] sm:max-w-[180px] md:max-w-[220px] lg:max-w-[220px] max-h-[160px] object-cover rounded-l-sm'
            src={tumbnailUrl}
          />
        </Link>
        <CardContent className='flex-1 pt-0.5 pb-1 pl-2 pr-1 md:py-2 md:pt-1 md:pr-2 flex flex-col gap-0 md:gap-0 justify-between'>
          <CardHeader className='p-0 gap-0.5'>
            <Link to='/post/$postId' params={{ postId: post.id }}>
              <CardTitle className='font-normal text-md leading-5 text-sky-600 line-clamp-2'>{post.title}</CardTitle>
            </Link>

            <CardDescription className='hidden sm:line-clamp-2 md:line-clamp-4 lg:line-clamp-4'>{post.shortDescription}</CardDescription>
          </CardHeader>

          <CardFooter className='flex justify-between p-0 text-xs text-muted-foreground'>
            <FormattedDate date={post.createdAt} />

            <Link
              to='/post/$postId'
              params={{ postId: post.id }}
              className={cn(
                buttonVariants({ variant: 'outline', size: 'icon' }),
                'h-7 cursor-pointer text-sky-600 hover:opacity-75 hover:text-sky-600'
              )}
            >
              <ChevronRight />
            </Link>
          </CardFooter>
        </CardContent>
      </div>
    </Card>
  );
};
