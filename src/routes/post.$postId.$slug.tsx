import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { postQueryOptions } from '@/services/queries';
import { SinglePost } from '@/components/SinglePost';

const PostComponent = () => {
  const { postId } = Route.useParams();
  const { data: post } = useSuspenseQuery(postQueryOptions({ id: postId }));

  return <SinglePost post={post} />;
};

const PostErrorComponent = () => {
  const router = useRouter();

  router.navigate({ to: '/' });
};

export const Route = createFileRoute('/post/$postId/$slug')({
  params: {
    parse: ({ postId, slug }) => {
      const numberPostId = Number(postId);

      if (isNaN(numberPostId) || numberPostId <= 0) {
        throw new Error('Invalid post Id');
      }

      return { postId: numberPostId, slug };
    },
  },
  loader: ({ context: { queryClient }, params: { postId } }) => {
    return queryClient.ensureQueryData(postQueryOptions({ id: postId }));
  },
  errorComponent: PostErrorComponent,
  component: PostComponent,
});
