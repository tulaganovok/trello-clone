import { Button } from '#/components/ui/button'
import { cn } from '#/lib/utils'
import { linkOptions, useLocation } from '@tanstack/react-router'
import { SquareKanban } from 'lucide-react'

const sidebarItems = linkOptions([
  { to: '/boards', title: 'Boards', icon: SquareKanban },
  // {to:'/templates',title:'Templates', icon:}
])

export default function Sidebar() {
  const location = useLocation()

  return (
    <aside className="max-md:hidden pt-22 w-80 h-screen p-8">
      <div className="flex flex-col gap-y-1">
        {['Boards', 'Templates', 'Home'].map((item, index) => (
          <Button
            key={index}
            variant={'ghost'}
            className={cn(
              'rounded-md justify-start',
              location.pathname === `/${item.toLowerCase()}` &&
                'bg-primary-foreground text-primary',
            )}
          >
            {item}
          </Button>
        ))}
      </div>
    </aside>
  )
}
