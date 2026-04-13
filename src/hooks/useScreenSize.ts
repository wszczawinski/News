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
    const mobileQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const tabletQuery = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT - 1}px)`);

    const handleQueryChange = () => {
      setScreenSize(getScreenSize());
    };

    mobileQuery.addEventListener('change', handleQueryChange);
    tabletQuery.addEventListener('change', handleQueryChange);

    return () => {
      mobileQuery.removeEventListener('change', handleQueryChange);
      tabletQuery.removeEventListener('change', handleQueryChange);
    };
  }, []);

  return screenSize;
};
