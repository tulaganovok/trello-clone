import { Button } from '#/components/ui/button'
import {
  Inbox,
  LayoutTemplate,
  NotepadText,
  Settings,
  TowerControl,
  Zap,
} from 'lucide-react'

const featureItems = [
  {
    title: 'Inbox',
    description:
      'Capture every vital detail from emails, Slack, and more directly into your Trello Inbox.',
    icon: Inbox,
  },
  {
    title: 'Planner',
    description:
      'Sync your calendar and allocate focused time slots to boost productivity.',
    icon: NotepadText,
  },

  {
    title: 'Automation',
    description: 'Automate tasks and workflows with Trello.',
    icon: Zap,
  },
  {
    title: 'Power-Ups',
    description:
      'Power up your teams by linking their favorite tools with Trello plugins.',
    icon: TowerControl,
  },
  {
    title: 'Templates',
    description:
      'Give your team a blueprint for success with easy-to-use templates from industry leaders and the Trello community.',
    icon: LayoutTemplate,
  },
  {
    title: 'Integrations',
    description:
      'Find the apps your team is already using or discover new ways to get work done in Trello.',
    icon: Settings,
  },
]

export default function FeaturesContent() {
  return (
    <div
      role="button"
      onClick={(e) => e.stopPropagation()}
      className="bg-background grid grid-cols-3"
    >
      <div className="col-span-2 pt-8 pb-16 pl-54 pr-20">
        <div className="border-b pb-4">
          <h3 className="font-semibold text-sm">
            Explore the features that help your team succeed
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-y-4  mt-6">
          {featureItems.map((item) => (
            <div
              key={item.title}
              className={`p-4 hover:cursor-pointer hover:bg-blue-100/50`}
            >
              <div className={`flex items-center gap-x-2 `}>
                <item.icon className="size-4" />
                <h4 className='text-sm'>{item.title}</h4>
              </div>

              <p className="text-[11px] text-muted-foreground mt-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-purple-100/50 pt-8 pb-12 pr-54 pl-8">
        <div className="border-b pb-4 border-purple-900">
          <h3 className="font-semibold text-sm">Meet Trello</h3>
        </div>

        <p className="text-[11px] mt-4 text-muted-foreground">
          Trello makes it easy for your team to get work done. No matter the
          project, workflow, or type of team, Trello can help keep things
          organized. It’s simple – sign-up, create a board, and you’re off!
          Productivity awaits.
        </p>

        <Button
          variant={'outline'}
          className="mt-6 h-12 text-sm font-medium border-purple-900 hover:bg-purple-100"
        >
          Check out Trello
        </Button>
      </div>
    </div>
  )
}
