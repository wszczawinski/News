import youtubeSvg from '@/images/youtube.svg';
import facebookSvg from '@/images/facebook.svg';

export const NavContent = ({ onClick }: { onClick?: () => void }) => {
  return (
    <>
      <a
        href={'https://www.youtube.com/elubawa'}
        className='flex gap-2 items-center text-muted-foreground transition-colors hover:text-foreground'
        target='_blank'
        onClick={onClick}
      >
        <img src={youtubeSvg} alt='YouTube' className='w-6 h-6' title='YouTube' />
        <span className='sm:hidden'>YouTube</span>
      </a>
      <a
        href={'https://www.facebook.com/profile.php?id=61574351347582'}
        className='flex gap-2 items-center text-muted-foreground transition-colors hover:text-foreground'
        target='_blank'
        onClick={onClick}
      >
        <img src={facebookSvg} alt='YouTube' className='w-6 h-6' title='Facebook' />
        <span className='sm:hidden'>Facebook</span>
      </a>
    </>
  );
};
