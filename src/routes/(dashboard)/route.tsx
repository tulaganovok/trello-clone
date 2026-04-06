import { getSessionFn } from '#/features/dashboard/functions/session'
import Navbar from '#/features/dashboard/components/navbar'
import { createFileRoute } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'
import { Suspense } from 'react'

export const Route = createFileRoute('/(dashboard)')({
  component: DashboardLayout,
  loader: () => getSessionFn(),
})

function DashboardLayout() {
  const data = Route.useLoaderData()

  return (
    <>
      <Navbar user={{ ...data.user, image: data.user.image! }} />

      <Suspense fallback={<div className="h-screen w-screen bg-accent" />}>
        <Outlet />
      </Suspense>
    </>
  )
}
