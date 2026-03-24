import { createLazyFileRoute } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'
import SignInForm from '#/features/auth/components/sign-in-form'
import { Link } from '@tanstack/react-router'
import { Dot, KeyRound } from 'lucide-react'

export const Route = createLazyFileRoute('/(auth)/sign-in')({
  component: SignInPage,
})

const socialProviders = ['Google', 'Microsoft', 'Apple', 'Slack']

function SignInPage() {
  return (
    <div>
      <h5 className="text-sm font-semibold text-center">Log in to continue</h5>

      <div className="mt-4">
        <SignInForm />
      </div>

      <div className="space-y-3 mt-6">
        <h5 className="text-xs text-center font-medium text-muted-foreground">
          Or login with:
        </h5>

        <Button variant={'outline'} className="w-full h-10 font-semibold">
          <KeyRound className="size-6" /> Passkey
        </Button>
      </div>

      <div className="space-y-3 mt-6">
        <h5 className="text-xs text-center font-medium text-muted-foreground">
          Or continue with:
        </h5>

        <div className="space-y-4">
          {socialProviders.map((provider, index) => (
            <Button
              key={index}
              variant={'outline'}
              className="w-full h-10 font-semibold"
            >
              <img
                src={`/images/${provider.toLowerCase()}.png`}
                alt="Google"
                className="size-6"
              />
              {provider}
            </Button>
          ))}
        </div>

        <div className="flex items-center justify-center gap-x-1 mt-6">
          <Link to="/sign-up" className="text-xs underline text-primary">
            Can't log in?
          </Link>

          <Dot className="size-3 stroke-primary" />

          <Link to="/sign-up" className="text-xs underline text-primary">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  )
}
