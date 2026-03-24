import { Button } from "#/components/ui/button"

const workItems = [
  {
    title: 'Integrations',
    description: 'Connect the apps you are already using into your Trello workflow or add a Power-Up to fine-tune your specific needs.',
    image: 'https://images.ctfassets.net/rz1oowkt5gyp/gMfkjoA3yWYG3kat3qjpW/1935c0e535bc27c820c13c1a1e02b4ed/Integration.svg',
    label: 'Browse Integrations'
  },
  {
    title: 'Automation',
    description: 'No-code automation is built into every Trello board. Focus on the work that matters most and let the robots do the rest.',
    image: 'https://images.ctfassets.net/rz1oowkt5gyp/7wxRW93hvb7858bMsK4LSs/336a6acc2c9a7a515a37bd895b98d4f6/Autodev.svg',
    label: 'Get to know Automation'
  },
  {
    title: 'Card mirroring',
    description: 'View all your to-dos from multiple boards in one place. Mirror a card to keep track of work wherever you need it!',
    image: 'https://images.ctfassets.net/rz1oowkt5gyp/2QHMr8zhoP0jlvvXC8k2am/0f2a100621210cc76e0298bd07bbc0ca/Project_management.svg',
    label: 'Compare plans'
  },
]

export default function Work() {
  return (
    <section className="pt-8 md:pt-20 pb-6 px-4 md:px-12 lg:px-24 xl:px-40 2xl:px-54">
      <div className="max-w-150">
        <h3 className="font-semibold">WORK SMARTER</h3>
        <h2 className="text-3xl font-semibold mt-4">Do more with Trello</h2>

        <p className="text-lg mt-6 leading-8">Customize the way you organize with easy integrations, automation, and mirroring of your to-dos across multiple locations.</p>

      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {workItems.map((item, index) => <div key={index} className="bg-secondary  p-6 rounded-lg">
          <div className="h-full flex flex-col justify-between gap-y-6">
            <div className="space-y-4">

              <img src={item.image} alt={item.title} className="size-24" />
              <h1 className="text-2xl font-semibold">{item.title}</h1>
              <p className="text-sm leading-6">{item.description}</p>
            </div>

            <Button variant={'outline'} className="self-start h-12 border-primary hover:bg-primary/10">{item.label}</Button>
          </div>
        </div>)}
      </div>
    </section>
  )
}
