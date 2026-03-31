import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(dashboard)/(main)/templates')({
  component: TemplatesPage,
})

function TemplatesPage() {
  return <div>Hello "/(dashboard)/templates"!</div>
}
