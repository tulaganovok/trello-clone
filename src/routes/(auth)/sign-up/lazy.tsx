import { Button } from '#/components/ui/button'
import SignUpForm from '#/features/auth/components/sign-up-form'
import { Link, createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(auth)/sign-up')({
  component: SignUpPage,
})

const socialProviders = ['Google', 'Microsoft', 'Apple', 'Slack']

function SignUpPage() {
  return (
    <div>
      <h5 className="text-sm font-semibold text-center">Sign up to continue</h5>

      <div className="mt-4">
        <SignUpForm />
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

        <div className="flex items-center justify-center gap-x-2 mt-6">
          <Link to="/sign-in" className="text-xs underline text-primary">
            Already have an account?
          </Link>

          <Link to="/sign-in" className="text-xs underline text-primary">
            Log in
          </Link>
        </div>
      </div>
    </div>
  )
}
