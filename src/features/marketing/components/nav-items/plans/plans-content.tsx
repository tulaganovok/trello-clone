import { Button } from '#/components/ui/button'
import { Balloon, Building2, Star, Zap } from 'lucide-react'

const plansItems = [
  {
    title: 'Standard',
    description:
      'For teams that need to manage more work and scale collaboration.',
    icon: Balloon,
    iconClassName: 'stroke-cyan-400 fill-cyan-400',
    boxClassName: 'hover:bg-cyan-100/50',
  },
  {
    title: 'Premium',
    description:
      'Best for teams up to 100 that need to track multiple projects and visualize work in a variety of ways.',
    icon: Star,
    iconClassName: 'stroke-pink-400 fill-pink-400',
    boxClassName: 'hover:bg-pink-100/50',
  },
  {
    title: 'Enterprise',
    description:
      'Everything your enterprise teams and admins need to manage projects.',
    icon: Building2,
    iconClassName: 'stroke-blue-400 fill-blue-400',
    boxClassName: 'hover:bg-blue-100/50',
  },
]

export default function PlansContent() {
  return (
    <div
      role="button"
      onClick={(e) => e.stopPropagation()}
      className="bg-background grid grid-cols-3"
    >
      <div className="col-span-2 pt-8 pb-16 pl-54 pr-20">
        <div className="grid grid-cols-3 gap-y-4">
          {plansItems.map((item) => (
            <div
              key={item.title}
              className={`p-4 hover:cursor-pointer ${item.boxClassName}`}
            >
              <div className={`flex items-center gap-x-2 `}>
                <item.icon className={`size-4 ${item.iconClassName}`} />
                <h4 className='text-sm'>{item.title}</h4>
              </div>

              <p className="text-[11px] text-muted-foreground mt-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 bg-amber-100/25 p-6 flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-x-2">
              <Zap className="size-4 stroke-amber-400 fill-amber-400" />
              <h4 className='text-sm'>Free plan</h4>
            </div>

            <p className="text-[11px] text-muted-foreground mb-5">
              For individuals or small teams looking to keep work organized.
            </p>
          </div>

          <Button
            variant={'outline'}
            className="h-12 text-sm font-medium border-amber-400 hover:bg-amber-100/50"
          >
            Take a tour of Trello
          </Button>
        </div>
      </div>

      <div className="bg-purple-100/50 pt-8 pb-12 pr-54 pl-8">
        <div className="border-b pb-4 border-purple-900">
          <h3 className="font-semibold text-sm">Compare plans & pricing</h3>
        </div>

        <p className="text-[11px] mt-4 text-muted-foreground">
          Whether you’re a team of 2 or 2,000, Trello’s flexible pricing model
          means you only pay for what you need.
        </p>

        <Button
          variant={'outline'}
          className="mt-6 h-12 text-sm font-medium border-purple-900 hover:bg-purple-100"
        >
          View Trello pricing
        </Button>
      </div>
    </div>
  )
}
