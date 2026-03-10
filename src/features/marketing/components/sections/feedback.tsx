import { Button } from "#/components/ui/button"
import { cn } from "#/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import useCarousel from "../../hooks/use-carousel"

const items = [
  {
    title: 'Joey Rosenberg|Global Leadership Director at Women Who Code',
    description: "[Trello is] great for simplifying complex processes. As a manager, I can chunk [processes] down into bite-sized pieces for my team and then delegate that out, but still keep a bird's-eye view.|75% of organizations report that Trello delivers value to their business within 30 days.",
    image: 'https://images.ctfassets.net/rz1oowkt5gyp/2f3keSvy…8fb5257c342995d25ba8e8e313d/WomenWhoCode_logo.svg'
  },
  {
    title: 'Sumeet Moghe|Product Manager at ThoughtWorks',
    description: 'Whether someone is in the office, working from home, or working on-site with a client, everyone can share context and information through Trello.|81% of customers chose Trello for its ease of use.', image: 'https://images.ctfassets.net/rz1oowkt5gyp/2kIh1cWq…d8436f3979be6cab7931f4d276c2d5ce/thoughtworks.svg'
  },
  {
    title: 'Jefferson Scomacao|Development Manager at IKEA/PTC',
    description: 'We used Trello to provide clarity on steps, requirements, and procedures. This was exceptional when communicating with teams that had deep cultural and language differences.|74% of customers say Trello has improved communication with their co-workers and teams.',
    image: 'https://images.ctfassets.net/rz1oowkt5gyp/3X64fxSs…UNI/911daed79127cb2f8a021da93fb68b9f/ptc-logo.svg'
  },
]

export default function Feedback() {
  const { index, setIndex, prevSlide, nextSlide, handleMouseDown, handleMouseMove, handleMouseUp } = useCarousel(items)

  return (
    <section className="pt-0 md:pt-20 pb-20 px-4 md:px-12 lg:px-24 xl:px-40 2xl:px-54 mb-32">
      <div className="flex flex-col md:flex-col-reverse md:gap-y-6">
        <div className="flex items-start flex-col-reverse md:flex-row gap-8">
          <div
            className="relative w-full mx-auto overflow-hidden cursor-grab active:cursor-grabbing select-none rounded-2xl"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {items.map((item, i) => (
                <div
                  key={i}
                  className="min-w-full border grid grid-cols-1 md:grid-cols-3"
                >
                    <div className="md:col-span-2 p-8 text-2xl pr-8 leading-10">{item.description.split('|').at(0)}</div>
                    <div className="bg-blue-900 text-background h-120">{item.description.split('|').at(1)}</div>

                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="flex items-center gap-x-6">
            <div className="flex items-center gap-x-2">
              {Array.from({ length: items.length }).map((_, idx) => (
                <div key={idx} role="button" onClick={() => setIndex(idx)} className={cn("h-2 bg-foreground rounded-full cursor-pointer hover:bg-muted-foreground", idx === index ? 'w-16 bg-muted-foreground' : 'w-2')} />
              ))}
            </div>

            <div className="max-md:hidden flex items-center gap-x-4">
              <Button size={'icon-sm'} variant={'secondary'} className="rounded-full" disabled={index === 0} onClick={prevSlide}>
                <ChevronLeft className="size-6 stroke-muted-foreground" />
              </Button>

              <Button size={'icon-sm'} variant={'secondary'} className="rounded-full" disabled={index === items.length - 1} onClick={nextSlide}>
                <ChevronRight className="size-6 stroke-muted-foreground" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
