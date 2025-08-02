import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'

import { postQueryOptions } from '@/services/queries'
import { SinglePost } from '@/components/SinglePost'

const PostErrorComponent = () => {
  const router = useRouter()

  router.navigate({ to: '/' })
}

const PostComponent = () => {
  const postId = Route.useParams().postId
  const { data: post } = useSuspenseQuery(postQueryOptions({ id: postId }))

  return (
    <SinglePost post={post} />
  )
}

export const Route = createFileRoute('/post/$postId')({
  loader: ({ context: { queryClient }, params: { postId } }) => {
    return queryClient.ensureQueryData(postQueryOptions({ id: postId }))
  },
  errorComponent: PostErrorComponent,
  component: PostComponent,
})
