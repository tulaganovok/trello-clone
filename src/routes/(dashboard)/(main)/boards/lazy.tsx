import RecentlyViewed from '#/features/dashboard/features/boards/components/recently-viewed'
import Workspaces from '#/features/dashboard/features/boards/components/workspaces'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(dashboard)/(main)/boards')({
  component: BoardsPage,
})

function BoardsPage() {
  return (
    <div className="px-4 py-8 md:py-12 md:pl-32 md:pr-40 space-y-12">
      <RecentlyViewed />

      <div>
        <h3 className="font-semibold text-neutral-600">YOUR WORKSPACES</h3>
        <Workspaces />
      </div>
    </div>
  )
}
