import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(dashboard)/boards')({
  component: BoardsPage,
})

function BoardsPage() {
  return <div>Boards Page</div>
}
