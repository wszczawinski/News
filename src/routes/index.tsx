import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { NewsList } from '@/components/NewsList';
import { postsQueryOptions } from '@/services/queries';
import { Spinner } from '@/components/ui/spinner';
import { QUERY_KEYS } from '@/services/api';
import { RouteError } from '@/components/RouteError';

const Home = () => {
  const { data: paginatedPosts } = useSuspenseQuery(postsQueryOptions({ page: 1, category: null }));

  return <NewsList paginatedPosts={paginatedPosts} />;
};

export const Route = createFileRoute('/')({
  loader: async ({ context: { queryClient } }) => {
    const paginatedPosts = await queryClient.ensureQueryData(postsQueryOptions({ page: 1, category: null }));

    for (const post of paginatedPosts.content) {
      queryClient.setQueryData([QUERY_KEYS.POST, post.id], post);
    }

    return paginatedPosts;
  },
  pendingComponent: () => (
    <div className='h-80 flex flex-col items-center justify-center'>
      <Spinner size={'large'} />
    </div>
  ),
  errorComponent: RouteError,
  component: Home,
});
