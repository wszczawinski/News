import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';

import './index.css';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  sendDefaultPii: true,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 15 * 60 * 1000, // 15min
      gcTime: 24 * 60 * 60 * 1000, // 24h
    },
  },
});
// const localStoragePersister = createSyncStoragePersister({
//   storage: window.localStorage,
//   retry: removeOldestQuery,
// });
// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
  defaultViewTransition: true,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// persistQueryClient({
//   queryClient,
//   persister: localStoragePersister,
//   maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
// });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ queryClient }} />
    </QueryClientProvider>
  </StrictMode>
);
