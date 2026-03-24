import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Link } from '@tanstack/react-router'
import { CirclePlay } from 'lucide-react'

export default function Hero() {
  return (
    <section className="bg-secondary">
      <div className="w-full pt-24 md:pt-32 grid grid-cols-1 md:grid-cols-2 px-4 md:px-12 lg:px-20 xl:px-28 2xl:px-32">
        <div className="flex flex-col justify-start md:ml-24 pt-12">
          <h1 className="text-2xl max-md:text-center md:text-4xl font-semibold leading-10 md:leading-14 md:mt-2 text-sky-950">
            Capture, organize, and tackle your to-dos from anywhere.
          </h1>

          <p className="text-lg max-md:text-center md:text-lg font-normal mt-2 md:mt-4 text-sky-950">
            Escape the clutter and chaos—unleash your productivity with Trello.
          </p>

          <div className="flex items-center gap-x-4 md:mr-24 mt-8">
            <Input
              className="bg-background h-12 max-md:hidden placeholder:text-sm w-96"
              placeholder="Email"
            />
            <Button
              className="h-12 bg-primary rounded-md max-md:w-full"
              asChild
            >
              <Link to="/sign-up">Sign up - it's free</Link>
            </Button>
          </div>

          <p className="text-sm max-md:text-center mt-4 md:mt-8 ">
            By entering my email, I acknowledge the{' '}
            <span className="text-primary underline">
              Atlassian Privacy Policy
            </span>
          </p>

          <p className="text-primary underline mt-12 text-sm max-md:text-center max-md:mb-8">
            Watch video{' '}
            <CirclePlay className="stroke-primary inline-block ml-1 size-5" />
          </p>
        </div>
        <div>
          <video data-testid="ui-video" muted autoPlay>
            <source
              src="//videos.ctfassets.net/rz1oowkt5gyp/4AJBdHGUKUIDo7Po3f2kWJ/3923727607407f50f70ccf34ab3e9d90/updatedhero-mobile-final.mp4"
              type="video/mp4"
            />
            Hero
          </video>
        </div>
      </div>
    </section>
  )
}
