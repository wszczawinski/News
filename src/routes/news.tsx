import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { categoryQueryOptions, postsQueryOptions } from '@/services/queries';
import { NewsList } from '@/components/NewsList';
import { Spinner } from '@/components/ui/spinner';
import { QUERY_KEYS } from '@/services/api';

type HomeParams = {
  page: number;
  category: string;
};

const validateSearch = (search: unknown): HomeParams => {
  if (typeof search !== 'object' || search === null) {
    return { page: 1, category: 'wszystkie' };
  }

  const searchObj = search as Record<string, unknown>;

  const page = typeof searchObj.page === 'number' && searchObj.page > 0 ? searchObj.page : 1;

  const category = typeof searchObj.category === 'string' ? searchObj.category : 'wszystkie';

  return { page, category };
};

const PostsPage = () => {
  const { page, category } = Route.useSearch();

  const { data: categories } = useSuspenseQuery(categoryQueryOptions());

  const categoryId = categories.find(c => c.slug === category)?.id || null;

  const { data: paginatedPosts } = useSuspenseQuery(postsQueryOptions({ page, category: categoryId }));

  return <NewsList paginatedPosts={paginatedPosts} />;
};

export const Route = createFileRoute('/news')({
  validateSearch: search => validateSearch(search),
  loaderDeps: (search): HomeParams => validateSearch(search),
  loader: async ({ context: { queryClient }, deps: { page, category } }) => {
    const categories = await queryClient.ensureQueryData(categoryQueryOptions());
    const categoryId = categories.find(c => c.slug === category)?.id || null;

    const paginatedPosts = await queryClient.ensureQueryData(postsQueryOptions({ page, category: categoryId }));

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
