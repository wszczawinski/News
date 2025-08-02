import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/links')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/links"!</div>
}
