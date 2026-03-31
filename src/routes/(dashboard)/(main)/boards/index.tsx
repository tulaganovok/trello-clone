import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(dashboard)/(main)/boards/')({
  head: () => ({ meta: [{ title: 'Boards | Trello' }] }),
})
