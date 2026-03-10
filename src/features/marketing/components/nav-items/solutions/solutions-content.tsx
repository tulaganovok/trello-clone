import { Button } from '#/components/ui/button'
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarCheck2,
  FileChartColumn,
  Globe,
  Megaphone,
  Pencil,
} from 'lucide-react'

const solutionsItems = [
  {
    title: 'Marketing teams',
    description:
      'Whether launching a new product, campaign, or creating content, Trello helps marketing teams succeed.',
    icon: Megaphone,
  },
  {
    title: 'Product management',
    description:
      'Use Trello’s management boards and roadmap features to simplify complex projects and processes.',
    icon: FileChartColumn,
  },
  {
    title: 'Engineering teams',
    description:
      'Ship more code, faster, and give your developers the freedom to be more agile with Trello.',
    icon: CalendarCheck2,
  },
  {
    title: 'Design teams',
    description:
      'Empower your design teams by using Trello to streamline creative requests and promote more fluid cross-team collaboration.',
    icon: Pencil,
  },
  {
    title: 'Startups',
    description:
      'From hitting revenue goals to managing workflows, small businesses thrive with Trello.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Remote teams',
    description:
      'Keep your remote team connected and motivated, no matter where they’re located around the world.',
    icon: Globe,
  },
]

export default function SolutionsContent() {
  return (
    <div
      role="button"
      onClick={(e) => e.stopPropagation()}
      className="bg-background grid grid-cols-3"
    >
      <div className="col-span-2 pt-8 pb-12 pl-54 pr-20">
        <div className="border-b pb-4">
          <h3 className="font-semibold text-sm">
            Take a page out of these pre-built Trello playbooks designed for all
            teams
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-y-4  mt-6">
          {solutionsItems.map((item) => (
            <div
              key={item.title}
              className={`p-4 hover:cursor-pointer hover:bg-blue-100/50`}
            >
              <div className={`flex items-center gap-x-2 `}>
                <item.icon className="size-4" />
                <h4 className="text-sm">{item.title}</h4>
              </div>

              <p className="text-[11px] text-muted-foreground mt-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <Button
          variant={'ghost'}
          className="font-normal text-sm hover:bg-background mt-2 "
        >
          See all teams <ArrowRight className="stroke-primary size-4 mt-0.5" />
        </Button>
      </div>

      <div className="bg-purple-100/50 pt-8 pb-12 pr-54 pl-8">
        <div className="border-b pb-4 border-purple-900">
          <h3 className="font-semibold text-sm">Our product in action</h3>
        </div>

        <div className="flex flex-col gap-y-6 mt-10">
          <div className="group space-y-2 hover:cursor-pointer">
            <div className="flex items-center gap-x-2">
              <h3 className="text-sm">Use case: Task management</h3>
              <ArrowRight className="hidden group-hover:block size-4 stroke-purple-900" />
            </div>

            <p className="text-[11px] text-muted-foreground">
              Track progress of tasks in one convenient place with a visual
              layout that adds ‘ta-da’ to your to-do’s.
            </p>
          </div>

          <div className="group space-y-2">
            <div className="flex items-center gap-x-2">
              <h3 className="text-sm">Use case: Project management</h3>
              <ArrowRight className="hidden group-hover:block size-4 stroke-primary" />
            </div>

            <p className="text-[11px] text-muted-foreground">
              Keep projects organized, deadlines on track, and teammates aligned
              with Trello.
            </p>
          </div>

          <div className="group space-y-2">
            <div className="flex items-center gap-x-2">
              <h3 className="text-sm">Use case: Project management</h3>
              <ArrowRight className="hidden group-hover:block size-4 stroke-primary" />
            </div>

            <p className="text-[11px] text-muted-foreground">
              Keep projects organized, deadlines on track, and teammates aligned
              with Trello.
            </p>
          </div>
        </div>

        <Button
          variant={'ghost'}
          className="font-normal hover:bg-transparent my-6 justify-start -ml-3 text-sm"
        >
          See all use cases{' '}
          <ArrowRight className="stroke-primary size-4 mt-0.5" />
        </Button>
      </div>
    </div>
  )
}
