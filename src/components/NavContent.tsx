import { Link } from '@tanstack/react-router';

import youtubeSvg from '@/images/youtube.svg';

import { CategorySelect } from './CategorySelect';

export const NavContent = ({ onClick }: { onClick?: () => void }) => {
  return (
    <>
      <div className='hidden sm:block'>
        <CategorySelect />
      </div>
      <Link
        to='/'
        onClick={onClick}
        activeOptions={{ includeSearch: true }}
        className='text-muted-foreground transition-colors hover:text-foreground'
        activeProps={{ className: 'text-sky-600 hover:text-sky-600' }}
      >
        Główna
      </Link>
      <a
        href={'https://www.youtube.com'}
        className='flex gap-2 items-center text-muted-foreground transition-colors hover:text-foreground'
        target='_blank'
        onClick={onClick}
      >
        YouTube
        <img src={youtubeSvg} alt='YouTube' className='w-6 h-6' title='YouTube' />
      </a>
    </>
  );
};
