import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 640;
const TABLET_BREAKPOINT = 768;

const getScreenSize = () => ({
  isMobile: window.innerWidth < MOBILE_BREAKPOINT,
  isTablet: window.innerWidth < TABLET_BREAKPOINT,
  isDesktop: window.innerWidth >= TABLET_BREAKPOINT,
});

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(getScreenSize);

  useEffect(() => {
    const handleResize = () => setScreenSize(getScreenSize());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};
