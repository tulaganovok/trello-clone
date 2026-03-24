import { useForm } from '@tanstack/react-form'
import { signInFormSchema } from '../schemas/auth'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { Button } from '#/components/ui/button'
import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { authClient } from '#/lib/auth-client'
import { toast } from 'sonner'

export default function SignInForm() {
  const [isSignInFormSubmitting, setIsSignInFormSubmitting] = useState(false)
  const navigate = useNavigate()

  const signInForm = useForm({
    defaultValues: { email: '', password: '' },
    validators: { onSubmit: signInFormSchema },
    onSubmit: async ({ value }) => {
      setIsSignInFormSubmitting(true)

      try {
        await authClient.signIn.email({
          ...value,
          fetchOptions: {
            onSuccess: () => {
              navigate({ to: '/boards' })
              signInForm.reset()
            },
            onError: ({ error }) => {
              toast.error(error.message)
            },
          },
        })
      } catch {
        toast.error('Failed to sign in')
      } finally {
        setIsSignInFormSubmitting(false)
      }
    },
  })

  return (
    <form
      id="sign-in-form"
      onSubmit={(e) => {
        e.preventDefault()
        signInForm.handleSubmit()
      }}
      className="space-y-3"
    >
      <FieldGroup>
        <signInForm.Field
          name="email"
          children={(field) => {
            const fieldStateMeta = field.state.meta
            const isInvalid =
              fieldStateMeta.isTouched && !fieldStateMeta.isValid

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>

                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  disabled={isSignInFormSubmitting}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                />

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />

        <signInForm.Field
          name="password"
          children={(field) => {
            const fieldStateMeta = field.state.meta
            const isInvalid =
              fieldStateMeta.isTouched && !fieldStateMeta.isValid

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  disabled={isSignInFormSubmitting}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
      </FieldGroup>

      <Button
        type="submit"
        className="w-full rounded-xs h-10"
        disabled={isSignInFormSubmitting}
      >
        Login
      </Button>
    </form>
  )
}
