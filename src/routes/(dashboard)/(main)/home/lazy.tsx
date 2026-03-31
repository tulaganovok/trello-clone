import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(dashboard)/(main)/home')({
  component: HomePage,
})

function HomePage() {
  return <div>Hello "/(dashboard)/home"!</div>
}
