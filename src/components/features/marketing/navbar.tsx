import { Button } from '#/components/ui/button'
import { Link } from '@tanstack/react-router'
import { cn } from '#/lib/utils'
import { useEffect, useState } from 'react'
import Features from './header/features'
import MobileMenu from './mobile-menu'
import Solutions from './header/solutions'
import Plans from './header/plans'
import Pricing from './header/pricing'
import Resources from './header/resources'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)

    handleScroll() // initial check
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'h-15 fixed inset-0 z-50 bg-background',
        scrolled && 'shadow-lg transition-all',
      )}
    >
      <div className="flex items-center justify-between size-full px-4 md:px-12 lg:px-20 xl:px-28 2xl:px-24">
        <div className="flex items-center h-full">
          <Link to="/" className="flex items-center h-full md:px-6">
            <img src="/marketing-logo.svg" alt="Marketing Logo" />
          </Link>

          <Features />
          <Solutions />
          <Plans />
          <Pricing />
          <Resources />
        </div>

        <div className="md:hidden">
          <MobileMenu />
        </div>

        <div className="flex items-center h-full max-md:hidden">
          <Button variant={'ghost'} className="h-full text-lg px-6">
            Log in
          </Button>
          <Button className="h-full text-lg px-6">
            Get Trello for free
          </Button>
        </div>
      </div>
    </header>
  )
}
