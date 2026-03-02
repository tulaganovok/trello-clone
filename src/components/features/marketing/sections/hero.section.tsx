import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'

export default function HeroSection() {
  return (
    <div className="bg-secondary">
      <div className="w-full pt-32 grid grid-cols-1 md:grid-cols-2 px-4 md:px-12 lg:px-20 xl:px-28 2xl:px-32">
        <div className="flex flex-col justify-start md:ml-24 pt-12">
          <h1 className="text-5xl font-semibold leading-16 ">
            Capture, organize, and tackle your to-dos from anywhere.
          </h1>

          <p className="text-xl font-normal mt-4">
            Escape the clutter and chaos—unleash your productivity with Trello.
          </p>

          <div className="flex items-center gap-x-4 mr-24 mt-8">
            <Input className="bg-background h-12 max-md:hidden placeholder:text-base" placeholder='Email' />
            <Button className="h-12 bg-primary max-md:w-full rounded-md">
              Sign up - it's free
            </Button>
          </div>
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
    </div>
  )
}
