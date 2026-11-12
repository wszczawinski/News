import { useEffect } from 'react';
import { ZapOff } from 'lucide-react';
import { type ErrorComponentProps, useRouter } from '@tanstack/react-router';
import * as Sentry from '@sentry/react';

export const RouteError = ({ error, reset }: ErrorComponentProps) => {
  const router = useRouter();

  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  const handleRetry = async () => {
    await router.invalidate();
    reset();
  };

  return (
    <div className='p-5 text-center flex flex-col items-center justify-center gap-6 border border-border rounded-lg h-80'>
      <ZapOff size={30} />
      <div>Something went wrong</div>
      <div className='text-sm text-muted-foreground'>Please try again or check your internet connection</div>
      <button onClick={handleRetry} className='px-4 py-2 text-sm rounded-md border border-border hover:bg-accent transition-colors'>
        Try again
      </button>
    </div>
  );
};
