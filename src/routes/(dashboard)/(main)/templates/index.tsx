import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(dashboard)/(main)/templates/')({
  head: () => ({ meta: [{ title: 'Templates | Trello' }] }),
})
