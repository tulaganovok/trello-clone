import Navbar from '#/components/features/marketing/navbar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(marketing)')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Navbar />

      <main className="pt-15">
        <Outlet />
      </main>
    </>
  )
}
