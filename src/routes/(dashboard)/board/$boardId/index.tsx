import { getBoardByIdFn } from '#/features/dashboard/features/boards/functions/board'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(dashboard)/board/$boardId/')({
  loader: ({ params }) => getBoardByIdFn({ data: { boardId: params.boardId } }),
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData?.title ?? 'Trello Board' }],
  }),
})
