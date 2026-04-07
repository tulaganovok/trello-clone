import { useServerFn } from '@tanstack/react-start'
import { Clock } from 'lucide-react'
import { getRecentlyViewedBoardsFn } from '../functions/board'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '#/components/ui/skeleton'
import BoardCard from './cards/board.card'

export default function RecentlyViewed() {
  const getRecentlyViewedBoards = useServerFn(getRecentlyViewedBoardsFn)

  const { isLoading, data: boards } = useQuery({
    queryKey: ['recently-viewed'],
    queryFn: getRecentlyViewedBoards,
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-x-2">
        <Clock className="size-6 text-neutral-700" />
        <h4 className="font-semibold text-neutral-700">Recently viewed</h4>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(isLoading || !boards) &&
          Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-28 w-full rounded-lg" />
          ))}

        {!isLoading &&
          boards && boards.length > 0 ?
          boards.map((board) => <BoardCard key={board.id} board={board} />) :
          <div className='col-span-2 md:col-span-4 py-12'>
            <h4 className='text-sm text-muted-foreground text-center'>No recently viewed boards yet.</h4>
          </div>
        }
      </div>
    </div>
  )
}
