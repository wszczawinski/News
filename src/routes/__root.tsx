import * as React from 'react';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { QueryClient } from '@tanstack/react-query';

import { Footer, Hero, MainContent, Navbar } from '@/components/layout';
import { bannersQueryOptions } from '@/services/queries';

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(bannersQueryOptions());
  },
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <Hero />
      <Navbar />
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
      <ReactQueryDevtools buttonPosition='top-right' />
      <TanStackRouterDevtools position='bottom-right' />
    </React.Fragment>
  );
}
