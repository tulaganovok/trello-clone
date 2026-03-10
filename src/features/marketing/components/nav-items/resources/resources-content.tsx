import { Button } from '#/components/ui/button'

const resourcesItems = [
  {
    title: 'Trello guide',
    description:
      'Our easy to follow workflow guide will take you from project set-up to Trello expert in no time.',
  },
  {
    title: 'Remote work guide',
    description:
      'The complete guide to setting up your team for remote work success.',
  },

  {
    title: 'Webinars',
    description:
      'Enjoy our free Trello webinars and become a productivity professional.',
  },
  {
    title: 'Customer stories',
    description:
      'See how businesses have adopted Trello as a vital part of their workflow.',
  },
  {
    title: 'Developers',
    description:
      "The sky's the limit in what you can deliver to Trello users in your Power-Up!",
  },
  {
    title: 'Help resources',
    description: 'Need help? Articles and FAQs to get you unstuck.',
  },
]

export default function ResourcesContent() {
  return (
    <div
      role="button"
      onClick={(e) => e.stopPropagation()}
      className="bg-background grid grid-cols-3"
    >
      <div className="col-span-2 pt-8 pb-16 pl-54 pr-20">
        <div className="border-b pb-4">
          <h3 className="font-medium text-sm">Learn & connect</h3>
        </div>

        <div className="grid grid-cols-3 gap-y-4  mt-6">
          {resourcesItems.map((item) => (
            <div
              key={item.title}
              className={`p-4 hover:cursor-pointer hover:bg-blue-100/50`}
            >
              <h4 className='text-sm'>{item.title}</h4>

              <p className="text-[11px] text-muted-foreground mt-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-purple-100/50 pt-8 pb-12 pr-54 pl-8">
        <div className="border-b pb-4 border-purple-900">
          <h3 className="font-medium text-sm">Helping teams work better, together</h3>
        </div>

        <p className="text-[11px] mt-4 text-muted-foreground">
          Discover Trello use cases, productivity tips, best practices for team
          collaboration, and expert remote work advice.
        </p>

        <Button
          variant={'outline'}
          className="mt-6 h-12 text-sm font-medium border-purple-900 hover:bg-purple-100"
        >
          Check out the Trello blog
        </Button>
      </div>
    </div>
  )
}
