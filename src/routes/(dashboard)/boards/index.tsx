import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(dashboard)/boards/')({
  head: () => ({ meta: [{ title: 'Boards | Trello' }] }),
})
