import { useEffect } from 'react';
import { type ErrorComponentProps, useRouter } from '@tanstack/react-router';
import * as Sentry from '@sentry/react';

import logo from '@/images/logo_nav_mobile.png';

export const RootRouteError = ({ error, reset }: ErrorComponentProps) => {
  const router = useRouter();

  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  const handleRetry = async () => {
    await router.invalidate();
    reset();
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-6 p-5 text-center'>
      <img width={140} src={logo} alt='e-Lubawa logo' className='aspect-169/29' />
      <div>Something went wrong</div>
      <div className='text-sm text-muted-foreground'>Please try again or check your internet connection</div>
      <button onClick={handleRetry} className='px-4 py-2 text-sm rounded-md border border-border hover:bg-accent transition-colors'>
        Try again
      </button>
    </div>
  );
};
