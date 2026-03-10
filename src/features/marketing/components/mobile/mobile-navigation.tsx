import { Button } from '#/components/ui/button'
import { ChevronRight } from 'lucide-react'

export default function MobileNavigation() {
  return (
    <div className="md:hidden h-[calc(100vh-60px)] w-screen mt-15 fixed z-30 bg-background px-4">
      {['Features', 'Solutions', 'Plans'].map((item, index) => (
        <div
          key={index}
          className="border-t cursor-pointer flex items-center justify-between py-5 "
        >
          <h3 className="text-lg">{item}</h3>
          <ChevronRight />
        </div>
      ))}

      <h3 className="border-t cursor-pointer py-6 text-lg">Pricing</h3>

      <div className="border-t cursor-pointer flex items-center justify-between py-5 ">
        <h3 className="text-lg">Resources</h3>
        <ChevronRight />
      </div>

      <div className="border-t space-y-4 pt-4">
        <Button className="w-full text-lg py-8">Get Trello for free</Button>
        <Button
          variant={'outline'}
          className="w-full text-lg border-primary py-8"
        >
          Login
        </Button>
      </div>
    </div>
  )
}
