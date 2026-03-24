import { cn } from "#/lib/utils";
import useCarousel from "../../hooks/use-carousel";

const items = [
  {
    title: 'Inbox',
    description: 'When it’s on your mind, it goes in your Inbox. Capture your to-dos from anywhere, anytime.',
    image: 'https://images.ctfassets.net/rz1oowkt5gyp/7lpUSxVqNRggpqzCNcnfo1/04cf35d0a0ef60e18c6575eb9a0374e4/inbox-slider.png'
  },
  {
    title: 'Boards',
    description: 'Your to-do list may be long, but it can be manageable! Keep tabs on everything from "to-dos to tackle" to "mission accomplished!”', image: 'https://images.ctfassets.net/rz1oowkt5gyp/w3lwhF5VUl2zPrQhoo6zi/87076ead73cad0973c907db1960bacfc/board-slider.png'
  },
  {
    title: 'Planner',
    description: 'Drag, drop, get it done. Snap your top tasks into your calendar and make time for what truly matters.',
    image: 'https://images.ctfassets.net/rz1oowkt5gyp/2CRH0gvg9NCw6tdLBHIBQy/eee39403406317dc1fc841bf3f685245/planner-slider.png'
  },
]

export default function About() {
  const { index, setIndex, handleMouseDown, handleMouseMove, handleMouseUp } = useCarousel(items)

  return (
    <section className="pt-4 pb-20 px-4 md:px-12 lg:px-24 xl:px-40 2xl:px-54">
      <div className="max-w-155">
        <h3 className="font-semibold">TRELLO 101</h3>
        <h2 className="text-3xl font-semibold mt-4">Your productivity powerhouse</h2>

        <p className="text-lg mt-6 leading-8">Stay organized and efficient with Inbox, Boards, and Planner. Every to-do, idea, or responsibility—no matter how small—finds its place, keeping you at the top of your game.</p>

      </div>

      <div className="flex flex-col md:flex-col-reverse mt-8 md:gap-y-6">
        <div className="flex items-start flex-col-reverse md:flex-row gap-8">
          <div className="w-full md:max-w-85">
            <div className="max-md:hidden w-full space-y-4">
              {items.map((item, idx) => <div key={idx} role="button" className={cn("rounded-lg p-4 cursor-pointer space-y-2", idx === index && 'border-l-8 border-cyan-500 shadow-xl')} onClick={() => setIndex(idx)}>
                <h4 className="font-semibold text-lg">{item.title}</h4>
                <p className="text-sm leading-6">{item.description}</p>
              </div>)}
            </div>
          </div>

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
                  className="min-w-full flex flex-col gap-y-4 text-2xl"
                >
                  <img src={item.image} alt={item.title} className="w-full h-64 md:h-122 object-fit" />

                  <div key={i} className={"rounded-lg flex-1 p-4 cursor-pointer space-y-2 md:hidden border-l-8 border-cyan-500 shadow-xl"} >
                    <h4 className="font-semibold text-base">{item.title}</h4>
                    <p className="text-sm leading-6">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="flex items-center gap-x-2">
            {Array.from({ length: items.length }).map((_, idx) => (
              <div key={idx} role="button" onClick={() => setIndex(idx)} className={cn("h-2 bg-foreground rounded-full cursor-pointer hover:bg-muted-foreground", idx === index ? 'w-16 bg-muted-foreground' : 'w-2')} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

