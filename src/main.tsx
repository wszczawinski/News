import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import * as Sentry from '@sentry/react';
import { QueryClient, useIsRestoring } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { RouterProvider, createRouter } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';
import './index.css';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 min
      gcTime: 24 * 60 * 60 * 1000, // 24h
    },
  },
});

const persister = createAsyncStoragePersister({
  storage: window.localStorage,
  key: 'NEWS_CACHE',
});

function PersistGate({ children }: { children: React.ReactNode }) {
  const isRestoring = useIsRestoring();
  return isRestoring ? null : <>{children}</>;
}

function InnerApp() {
  const [router] = useState(() =>
    createRouter({
      routeTree,
      context: { queryClient },
      defaultPreloadStaleTime: 0,
      scrollRestoration: true,
      defaultViewTransition: true,
    })
  );

  return <RouterProvider router={router} context={{ queryClient }} />;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      <PersistGate>
        <InnerApp />
      </PersistGate>
    </PersistQueryClientProvider>
  </StrictMode>
);
