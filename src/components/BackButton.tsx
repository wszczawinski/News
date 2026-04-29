import type { ReactNode } from 'react';
import { Undo2 } from 'lucide-react';
import { useCanGoBack, useRouter } from '@tanstack/react-router';

import { Button } from './ui/button';

export const BackButton = ({ children }: { children?: ReactNode }) => {
  const router = useRouter();
  const canGoBack = useCanGoBack();

  const handleGoBack = async () => {
    if (canGoBack) {
      router.history.back();
    } else {
      await router.navigate({ to: '/' });
    }
  };

  return (
    <Button onClick={handleGoBack} size={'sm'} variant={'outline'} className='cursor-pointer'>
      {children ? children : <Undo2 />}
    </Button>
  );
};
