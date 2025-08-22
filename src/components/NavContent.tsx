import { Link } from '@tanstack/react-router';

import youtubeSvg from '@/images/youtube.svg';

export const NavContent = ({ onClick }: { onClick?: () => void }) => {
  return (
    <>
      <Link
        to='/'
        onClick={onClick}
        activeOptions={{ includeSearch: true }}
        className='text-muted-foreground transition-colors hover:text-foreground'
        activeProps={{ className: 'text-sky-600 hover:text-sky-600' }}
      >
        Home
      </Link>
      <Link
        to='/links'
        onClick={onClick}
        className='text-muted-foreground transition-colors hover:text-foreground'
        activeProps={{ className: 'text-sky-600' }}
      >
        Links
      </Link>
      {/* <Link
        to={"/"}
        onClick={onClick}
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        Rowerowa
      </Link> */}
      <a href={'https://www.youtube.com'} target='_blank' onClick={onClick}>
        <img src={youtubeSvg} alt='YouTube' className='w-6 h-6' title='YouTube' />
      </a>
    </>
  );
};
