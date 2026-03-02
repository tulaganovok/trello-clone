import { Button } from '#/components/ui/button'
import { Link } from '@tanstack/react-router'
import MobileMenu from './mobile-menu'
import { cn } from '#/lib/utils'
import { useEffect, useState } from 'react'

export default function Navbar() {
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
      <div className="flex items-center justify-between size-full px-4 md:px-12 lg:px-20 xl:px-28 2xl:px-32">
        <div className="flex items-center h-full">
          <Link to="/" className="flex items-center h-full">
            <img src="/marketing-logo.svg" alt="Marketing Logo" />
          </Link>
        </div>

        <div className="md:hidden">
          <MobileMenu />
        </div>

        <div className="flex items-center h-full max-md:hidden">
          <Button variant={'ghost'} className="h-full text-lg font-normal">
            Log in
          </Button>
          <Button className="h-full text-lg font-normal">
            Get Trello for free
          </Button>
        </div>
      </div>
    </header>
  )
}
