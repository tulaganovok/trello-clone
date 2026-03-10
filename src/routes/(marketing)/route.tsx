import MobileNavigation from '#/features/marketing/components/mobile/mobile-navigation'
import Navbar from '#/features/marketing/components/navbar'
import Navigation from '#/features/marketing/components/navigation'
import { useMobileNavigation } from '#/features/marketing/hooks/use-mobile-navigation'
import { useNavigation } from '#/features/marketing/hooks/use-navigation'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/(marketing)')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isOpen } = useNavigation()
  const { isOpenMobile } = useMobileNavigation()

  useEffect(() => {
    document.body.style.overflow = isOpen || isOpenMobile ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, isOpenMobile])

  return (
    <>
      <Navbar />
      {isOpen && <Navigation />}
      {isOpenMobile && <MobileNavigation />}

      <main className={'pt-15'}>
        <Outlet />
      </main>
    </>
  )
}
