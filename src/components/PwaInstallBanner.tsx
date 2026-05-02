import { Download, Share, X } from 'lucide-react';

import { useInstallPrompt } from '@/hooks/useInstallPrompt';

export const PwaInstallBanner = () => {
  const { isVisible, isIos, canInstall, install, dismiss } = useInstallPrompt();

  if (!isVisible) return null;

  const subtitle = isIos ? 'Tap Share → Add to Home Screen' : 'Tap ⋮ menu → Add to Home Screen';

  return (
    <div className='fixed bottom-0 left-0 right-0 z-40 border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-3'>
      <div className='flex items-start gap-3 w-full mx-auto max-w-5xl'>
        {isIos ? (
          <Share size={18} className='shrink-0 mt-0.5 text-[#2074AF]' />
        ) : (
          <Download size={18} className='shrink-0 mt-0.5 text-[#2074AF]' />
        )}
        <div className='flex-1 min-w-0'>
          <p className='text-sm font-medium text-foreground'>Add to Home Screen</p>
          {!canInstall && <p className='text-xs text-muted-foreground mt-0.5'>{subtitle}</p>}
        </div>
        <div className='flex items-center gap-3 shrink-0'>
          {canInstall && (
            <button onClick={install} className='text-sm font-medium text-[#2074AF] hover:text-[#2074AF]/80 transition-colors'>
              Install
            </button>
          )}
          <button onClick={dismiss} aria-label='Dismiss' className='text-muted-foreground hover:text-foreground transition-colors'>
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
