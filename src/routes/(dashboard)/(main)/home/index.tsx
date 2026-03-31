import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(dashboard)/(main)/home/')({
  head: () => ({ meta: [{ title: 'Home | Trello' }] }),
})

