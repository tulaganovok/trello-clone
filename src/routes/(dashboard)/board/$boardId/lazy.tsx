import BoardNavbar from '#/features/dashboard/features/boards/components/board-navbar'
import ListContainer from '#/features/dashboard/features/boards/components/list/list-container'
import { getBoardByIdFn } from '#/features/dashboard/features/boards/functions/board'
import { useQuery } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'

export const Route = createLazyFileRoute('/(dashboard)/board/$boardId')({
  component: BoardIdPage,
})

function BoardIdPage() {
  const { boardId } = Route.useParams()
  const getBoardById = useServerFn(() => getBoardByIdFn({ data: { boardId } }))

  const { isLoading, data: board } = useQuery({
    queryKey: ['board', boardId],
    queryFn: getBoardById,
  })

  return (
    <>
      {(isLoading || !board) && <div className="h-screen w-screen bg-accent" />}

      {!isLoading && board && (
        <div
          className="relative h-screen bg-no-repeat bg-cover bg-center bg-accent"
          style={{ backgroundImage: `url(${board?.imageFullUrl})` }}
        >
          <BoardNavbar board={board} />

          <main className="h-full relative pt-28">
            <div className="p-4 h-full overflow-x-auto">
              <ListContainer boardId={boardId} lists={board.lists} />
            </div>
          </main>
        </div>
      )}
    </>
  )
}
