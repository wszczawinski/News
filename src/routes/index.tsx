import { ZapOff } from 'lucide-react';
import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { NewsList } from '@/components/NewsList';
import { categoryQueryOptions, postsQueryOptions } from '@/services/queries';
import { Spinner } from '@/components/ui/spinner';
import { QUERY_KEYS } from '@/services/api';

const Home = () => {
  const { data: paginatedPosts } = useSuspenseQuery(postsQueryOptions({ page: 1, category: null }));

  return <NewsList paginatedPosts={paginatedPosts} />;
};

export const Route = createFileRoute('/')({
  loader: async ({ context: { queryClient } }) => {
    const paginatedPosts = await queryClient.ensureQueryData(postsQueryOptions({ page: 1, category: null }));
    await queryClient.ensureQueryData(categoryQueryOptions());

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
  errorComponent: () => (
    <div className='p-5 text-center flex flex-col items-center justify-center gap-6 border border-border rounded-lg'>
      <div>Something went wrong with fetching the data</div>
      <ZapOff size={30} />
      <div>Please try again later or check your internet connection</div>
    </div>
  ),
  component: Home,
});
