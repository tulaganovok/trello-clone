import { createLazyFileRoute } from '@tanstack/react-router'
import { Clock } from 'lucide-react'

export const Route = createLazyFileRoute('/(dashboard)/boards')({
  component: BoardsPage,
})

function BoardsPage() {
  return <div className='px-4 py-8 md:py-12 md:px-32 space-y-12'>
    <div className='space-y-4'>
      <div className='flex items-center gap-x-2'>
        <Clock className='size-6 text-neutral-700' />
        <h4 className='font-semibold text-neutral-700'>Recently viewed</h4>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
        {Array.from({ length: 4 }).map((_, index) => <div key={index} className='flex flex-col rounded-lg border shadow-xs'>
          <div className='w-full h-19 bg-accent'></div>
          <div className='p-2'>
            <h3 className='text-sm text-neutral-700'>Board {index + 1}</h3>
          </div>
        </div>)}
      </div>
    </div>

    <div>
      <h3 className='font-semibold text-neutral-600'>YOUR WORKSPACES</h3>
    </div>
  </div>
}
