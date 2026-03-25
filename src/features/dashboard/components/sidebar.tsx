import { Button } from '#/components/ui/button'
import { cn } from '#/lib/utils'
import { Link, linkOptions, useLocation } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { Activity, Columns3, Plus, RotateCwSquare, Settings, Users } from 'lucide-react'
import { getUserWorkspacesFn } from '../functions/workspace'
import { useQuery } from '@tanstack/react-query'
import {
  Accordion,
  AccordionButtonTrigger,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion"
import { Skeleton } from '#/components/ui/skeleton'


const sidebarItems = linkOptions([
  { to: '/boards', title: 'Boards', icon: Columns3 },
  { to: '/templates', title: 'Templates', icon: RotateCwSquare },
  { to: '/home', title: 'Home', icon: Activity }
])

export default function Sidebar() {
  const location = useLocation()
  const getUserWorkspaces = useServerFn(getUserWorkspacesFn)

  const { isLoading, data: workspaces } = useQuery({
    queryKey: ['workspaces'],
    queryFn: () => getUserWorkspaces()
  })


  return (
    <aside className="max-md:hidden pt-22 w-80 h-screen px-8 flex flex-col">
      <div className="flex flex-col gap-y-1 border-b pb-1">
        {sidebarItems.map(({ to, title, icon: Icon }, index) => (
          <Button
            key={index}
            variant={'ghost'}
            className={cn(
              'group rounded-md justify-start',
              location.pathname === to &&
              'bg-primary-foreground hover:bg-primary-foreground',
            )}
            asChild
          >
            <Link to={to} className='size-full flex items-center gap-x-2'>
              <Icon className={cn('stroke-neutral-700', location.pathname === to && 'stroke-primary group-hover:stroke-primary')} />
              <span className={cn('text-neutral-700', location.pathname === to && 'text-primary group-hover:text-primary')}>{title}</span>
            </Link>
          </Button>
        ))}
      </div>

      <div className='flex flex-col mt-6 flex-1 overflow-y-auto gap-y-2'>
        <h6 className='text-xs text-muted-foreground font-semibold px-2'>Workspaces</h6>

        {!isLoading || !workspaces && <div className='flex flex-col gap-y-1'>
          {Array.from({ length: 8 }).map((_, index) => <div key={index} className='flex items-center justify-between p-2'>
            <div className='flex items-center gap-x-2'>
              <Skeleton className='size-6 rounded-sm'/>
              <Skeleton className='w-32 h-4 rounded-xs'/>
            </div>

            <Skeleton className='size-4 rounded-xs'/>
          </div>)}
        </div>}

        {!isLoading && workspaces &&
          <Accordion type="multiple">
            {workspaces.map(workspace => (
              <AccordionItem key={workspace.id} value={workspace.id}>
                <AccordionButtonTrigger asChild>
                  <div className='size-full flex items-center gap-x-2'>
                    <div className='size-6 bg-primary rounded-sm font-semibold uppercase text-background flex items-center justify-center text-lg'>{workspace.name.at(0)}</div>

                    <span className='text-neutral-700'>
                      {workspace.name}
                    </span>
                  </div>
                </AccordionButtonTrigger>

                <AccordionContent className='flex flex-col mt-1 gap-y-1'>
                  <Button size={'sm'} variant={'ghost'} className='justify-start text-neutral-700 hover:text-neutral-700'><Columns3 className='ml-8 mr-1 stroke-neutral-700' />Boards</Button>

                  <Button size={'sm'} variant={'ghost'} className='justify-start pl-12'>
                    <Users className='ml-8 mr-1 stroke-neutral-700' /><span className='flex-1 justify-start text-start text-neutral-700'>Members</span>
                    <Plus className='stroke-neutral-700 mr-1' />
                  </Button>

                  <Button size={'sm'} variant={'ghost'} className='justify-start pl-12 text-neutral-700 hover:text-neutral-700'><Settings className='ml-8 mr-1 stroke-neutral-700' />Settings</Button>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        }
      </div>
    </aside>
  )
}
