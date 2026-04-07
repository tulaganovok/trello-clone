import { getBoardByIdFn } from '#/features/dashboard/features/boards/functions/board'
import { createFileRoute } from '@tanstack/react-router'
import BoardNavbar from '#/features/dashboard/features/boards/components/board-navbar'
import ListContainer from '#/features/dashboard/features/boards/components/list/list-container'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import { useEffect, useState } from 'react'
import { getSessionFn } from '#/features/dashboard/functions/session'
import { useDragScroll } from '#/features/dashboard/features/boards/hooks/use-drag-scroll'

export const Route = createFileRoute('/(dashboard)/board/$boardId/')({
  component: BoardIdPage,
})

function BoardIdPage() {
  const { boardId } = Route.useParams()
  const getBoardById = useServerFn(() => getBoardByIdFn({ data: { boardId } }))
  const getSession = useServerFn(() => getSessionFn())
  const [isDragging, setIsDragging]=useState(false)
  const { ref, handlers } = useDragScroll({disabled:isDragging})


  const { data: board } = useSuspenseQuery({
    queryKey: ['board', boardId],
    queryFn: getBoardById,
  })

  const { data: session } = useSuspenseQuery({
    queryKey: ['session'],
    queryFn: getSession,
  })

  useEffect(() => {
    document.title = board.title
  }, [board.title])

  return (
    <div
      className="relative h-screen bg-no-repeat bg-cover bg-center bg-accent"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <BoardNavbar
        board={board}
        user={{ ...session.user, image: session.user.image! }}
      />

      <main className="h-full relative pt-26">
        <div ref={ref}
          {...handlers} className="p-4 h-full overflow-x-auto">
          <ListContainer
            lists={board.lists}
            setIsDragging={setIsDragging}
          />
        </div>
      </main>
    </div>
  )
}
