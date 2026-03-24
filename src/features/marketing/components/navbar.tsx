import { Button } from '#/components/ui/button'
import { Link } from '@tanstack/react-router'
import { cn } from '#/lib/utils'
import { useEffect, useState } from 'react'
import { useNavigation } from '../hooks/use-navigation'
import FeaturesBtn from './nav-items/features/features-btn'
import SolutionsBtn from './nav-items/solutions/solutions-btn'
import PlansBtn from './nav-items/plans/plans-btn'
import Pricing from './nav-items/pricing'
import ResourcesBtn from './nav-items/resources/resources-btn'
import MobileMenu from './mobile/mobile-menu'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { isOpen } = useNavigation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'h-15 fixed inset-0 z-50 bg-background',
        scrolled && 'shadow-lg transition-all',
        isOpen && 'shadow-xl',
      )}
    >
      <div
        role="button"
        className="flex items-center justify-between size-full px-4 md:px-12 lg:px-20 xl:px-28 2xl:px-24"
      >
        <div className="flex items-center h-full">
          <Link to="/" className="flex items-center h-full md:px-6">
            <img src="/marketing-logo.svg" alt="Marketing Logo" />
          </Link>

          <div className="max-md:hidden flex items-center h-full">
            <FeaturesBtn />
            <SolutionsBtn />
            <PlansBtn />
            <Pricing />
            <ResourcesBtn />
          </div>
        </div>

        <div className="md:hidden">
          <MobileMenu />
        </div>

        <div className="flex items-center h-full max-md:hidden">
          <Button variant={'ghost'} className="h-full text-lg px-6" asChild>
            <Link to="/sign-in">Log in</Link>
          </Button>

          <Button className="h-full text-lg px-6" asChild>
            <Link to="/sign-up">Get Trello for free</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
