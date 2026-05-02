import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISSED_KEY = 'pwa-install-dismissed';
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

const IS_IOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
const IS_MOBILE = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const IS_STANDALONE =
  window.matchMedia('(display-mode: standalone)').matches || (navigator as Navigator & { standalone?: boolean }).standalone === true;

const isDismissedRecently = () => {
  const ts = localStorage.getItem(DISMISSED_KEY);
  if (!ts) return false;
  return Date.now() - Number(ts) < SEVEN_DAYS;
};

export const useInstallPrompt = () => {
  const [isDismissed, setIsDismissed] = useState(isDismissedRecently);
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if (isDismissed || IS_STANDALONE || IS_IOS) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, [isDismissed]);

  const install = async () => {
    if (!installEvent) return;
    await installEvent.prompt();
    const { outcome } = await installEvent.userChoice;
    if (outcome === 'accepted') setInstallEvent(null);
  };

  const dismiss = () => {
    localStorage.setItem(DISMISSED_KEY, String(Date.now()));
    setIsDismissed(true);
  };

  return {
    isVisible: !isDismissed && !IS_STANDALONE && IS_MOBILE,
    isIos: IS_IOS,
    canInstall: !!installEvent,
    install,
    dismiss,
  };
};
