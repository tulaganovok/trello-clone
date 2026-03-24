import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Link } from '@tanstack/react-router'

export default function GetStarted() {
  return (
    <div className="max-md:bg-linear-to-tr from-purple-800 to-pink-400 md:bg-secondary px-4 py-12 md:py-16">
      <h3 className="max-md:text-background text-center text-2xl md:text-3xl font-semibold">
        Get started with Trello today
      </h3>

      <div className="flex items-center gap-x-4 mt-6 justify-center">
        <Input
          className="bg-background h-12 max-md:hidden placeholder:text-sm w-96"
          placeholder="Email"
        />
        <Button className="h-12 bg-primary rounded-md max-md:w-full" asChild>
          <Link to="/sign-up">Sign up - it's free</Link>
        </Button>
      </div>

      <h5 className="mt-6 text-center text-sm max-md:text-background">
        By entering my email, I acknowledge the{' '}
        <span className="text-background md:text-primary underline">
          Atlassian Privacy Policy
        </span>
      </h5>
    </div>
  )
}
