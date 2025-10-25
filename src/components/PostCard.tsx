import { ChevronRight } from 'lucide-react';
import { Link } from '@tanstack/react-router';

import type { Post } from '@/types';
import news_img_1 from '@/images/news_img_1.png';
import news_img_4 from '@/images/news_img_4.png';
import news_img_5 from '@/images/news_img_5.png';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { FormattedDate } from './FormattedDate';

export const PostCard = ({ post }: { post: Post }) => {
  const newsImages = [news_img_1, news_img_4, news_img_5];
  const randomImg = newsImages[Math.floor(Math.random() * newsImages.length)];

  return (
    <Card key={post.id} className='md:h-[162px]'>
      <div className='flex flex-col md:flex-row '>
        <img className='h-[140px] md:h-[160px] md:w-[220px] object-cover rounded-t-lg md:rounded-l-lg md:rounded-r-none' src={randomImg} />
        <CardContent className='flex-1 pt-1 pb-2 px-2 flex flex-col gap-1 justify-between '>
          <CardHeader className='p-0'>
            <Link to='/post/$postId' params={{ postId: post.id }}>
              <CardTitle className='font-normal text-lg text-sky-600'>{post.title}</CardTitle>
            </Link>

            <CardDescription className='m-0 line-clamp-4'>{post.content}</CardDescription>
          </CardHeader>

          <CardFooter className='flex justify-between p-0 text-xs'>
            <FormattedDate date={post.createdAt} />

            <Link to='/post/$postId' params={{ postId: post.id }}>
              <Button size={'sm'} variant={'outline'} className='cursor-pointer text-sky-600 hover:opacity-75 hover:text-sky-600'>
                <ChevronRight />
              </Button>
            </Link>
          </CardFooter>
        </CardContent>
      </div>
    </Card>
  );
};
