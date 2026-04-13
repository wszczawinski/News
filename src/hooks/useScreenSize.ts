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
    const handleResize = () => {
      const newScreenSize = getScreenSize();
      setScreenSize(prev => {
        if (
          prev.isMobile === newScreenSize.isMobile &&
          prev.isTablet === newScreenSize.isTablet &&
          prev.isDesktop === newScreenSize.isDesktop
        ) {
          return prev;
        }
        return newScreenSize;
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};
