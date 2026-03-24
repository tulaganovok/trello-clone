import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(dashboard)/home/')({
  head: () => ({ meta: [{ title: 'Home | Trello' }] }),
})

