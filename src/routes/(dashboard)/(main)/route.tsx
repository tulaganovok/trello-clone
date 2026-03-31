import CreateWorkspace from '#/features/dashboard/components/create-workspace'
import Sidebar from '#/features/dashboard/components/sidebar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(dashboard)/(main)')({
  component: DashboardMainLayout,
})

function DashboardMainLayout() {
  return (
    <>
      <div className="flex max-h-screen">
        <Sidebar />

        <div className="flex-1 overflow-y-auto pt-12">
          <Outlet />
        </div>
      </div>

      <CreateWorkspace />
    </>
  )
}
