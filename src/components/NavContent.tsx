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
      <Link
        to='/links'
        onClick={onClick}
        className='text-muted-foreground transition-colors hover:text-foreground'
        activeProps={{ className: 'text-sky-600' }}
      >
        Linki
      </Link>
      <a href={'https://www.youtube.com'} target='_blank' onClick={onClick}>
        <img src={youtubeSvg} alt='YouTube' className='w-6 h-6' title='YouTube' />
      </a>
    </>
  );
};
