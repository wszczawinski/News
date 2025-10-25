import { z } from 'zod';
import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { postsQueryOptions } from '@/services/queries';
import { Posts } from '@/components/Posts';
import { Spinner } from '@/components/ui/spinner';
import { QUERY_KEYS } from '@/services/api';

const newsSearchSchema = z.object({
  page: z.number().catch(1),
  category: z.string().catch('all'),
});

type HomeParams = z.infer<typeof newsSearchSchema>;

export const Route = createFileRoute('/news')({
  validateSearch: search => newsSearchSchema.parse(search),
  loaderDeps: (search): HomeParams => newsSearchSchema.parse(search),
  loader: async ({ context: { queryClient }, deps: { page, category } }) => {
    const paginatedPosts = await queryClient.ensureQueryData(postsQueryOptions({ page, category }));

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
  errorComponent: () => <div className='h-80 flex flex-col items-center justify-center'>Error occured</div>,
  component: PostsPage,
});

function PostsPage() {
  const { page, category } = Route.useSearch();
  const { data: paginatedPosts } = useSuspenseQuery(postsQueryOptions({ page, category }));

  return <Posts paginatedPosts={paginatedPosts} />;
}
