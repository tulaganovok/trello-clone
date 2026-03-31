import { useServerFn } from '@tanstack/react-start'
import { getUserDetailedWorkspacesFn } from '../../../functions/workspace'
import { useQuery } from '@tanstack/react-query'
import { Button } from '#/components/ui/button'
import { Columns3, Settings, ShoppingBag, User } from 'lucide-react'
import { Skeleton } from '#/components/ui/skeleton'
import CreateBoard from './create-board'
import BoardCard from './cards/board.card'

export default function Workspaces() {
  const getUserDetailedWorkspaces = useServerFn(getUserDetailedWorkspacesFn)

  const { isLoading, data: workspaces } = useQuery({
    queryKey: ['detailed-workspaces'],
    queryFn: getUserDetailedWorkspaces,
  })

  return (
    <div className="mt-6">
      {(isLoading || !workspaces) && (
        <div className="flex flex-col gap-y-10">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center max-md:gap-y-3">
                <div className="flex items-center gap-x-2">
                  <Skeleton className="rounded-md size-8" />
                  <Skeleton className="h-5 w-64" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton key={index} className="rounded-md h-8 md:w-28" />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-28 rounded-lg" />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && workspaces && (
        <div className="flex flex-col gap-y-10">
          {workspaces.map((workspace) => (
            <div key={workspace.id} className="space-y-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center max-md:gap-y-3">
                <div className="flex items-center gap-x-2">
                  <div className="relative rounded-md bg-primary size-8">
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase text-background text-xl font-semibold">
                      {workspace.name.at(0)}
                    </span>
                  </div>

                  <h3 className="text-lg font-medium">{workspace.name}</h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <Button size={'sm'} variant={'secondary'}>
                    <Columns3 /> Boards
                  </Button>

                  <Button size={'sm'} variant={'secondary'}>
                    <User /> Members
                  </Button>

                  <Button size={'sm'} variant={'secondary'}>
                    <Settings /> Settings
                  </Button>

                  <Button
                    size={'sm'}
                    variant={'secondary'}
                    className="bg-purple-100 text-purple-900"
                  >
                    <ShoppingBag className="stroke-purple-900" /> Upgrade
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {workspace.boards.map((board) => (
                  <BoardCard key={board.id} board={board} />
                ))}

                <CreateBoard workspaceId={workspace.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
