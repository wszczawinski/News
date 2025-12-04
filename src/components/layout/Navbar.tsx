import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Link } from '@tanstack/react-router';

import logo from '@/images/logo_nav_mobile.png';
import logo_desktop from '@/images/logo_nav_desktop.png';

import { NavContent } from '../NavContent';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className='sticky top-0 z-50 w-full h-14 px-4 md:px-6 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='h-full flex items-center justify-between gap-4 w-full mx-auto max-w-screen-lg md:pl-[58px]'>
        <div className='sm:hidden'>
          <Link to='/'>
            <img width={169} height={29} src={logo} alt='e-Lubawa logo' />
          </Link>
        </div>

        <div className='hidden sm:block'>
          <Link to='/'>
            <img width={136} height={28} src={logo_desktop} alt='e-Lubawa logo' />
          </Link>
        </div>

        <nav className='hidden sm:flex font-medium flex-row items-center justify-end gap-5 lg:gap-8'>
          <NavContent onClick={() => setOpen(false)} />
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <div className='flex sm:hidden'>
            <SheetTrigger asChild>
              <Button variant='outline' size='sm' className='shrink-0 md:hidden'>
                <Menu className='h-5 w-5' />
                <span className='sr-only'>Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
          </div>
          <SheetContent side='left'>
            <nav className='grid gap-6 text-lg font-medium p-6'>
              <img width={169} height={29} src={logo} alt='e-Lubawa logo' />
              <NavContent onClick={() => setOpen(false)} />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
