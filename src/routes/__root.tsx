import * as React from 'react';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { QueryClient } from '@tanstack/react-query';

import { Footer, Hero, MainContent, Navbar } from '@/components/layout';
import { bannersQueryOptions, categoryQueryOptions } from '@/services/queries';

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  loader: ({ context: { queryClient } }) => {
    void queryClient.ensureQueryData(bannersQueryOptions());
    void queryClient.ensureQueryData(categoryQueryOptions());
  },
  component: () => {
    return (
      <React.Fragment>
        <Hero />
        <Navbar />
        <MainContent>
          <Outlet />
        </MainContent>
        <Footer />
        {import.meta.env.DEV && <ReactQueryDevtools buttonPosition='top-right' />}
        {import.meta.env.DEV && <TanStackRouterDevtools position='bottom-right' />}
      </React.Fragment>
    );
  },
});
