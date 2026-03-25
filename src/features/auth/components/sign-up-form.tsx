import { useForm } from '@tanstack/react-form'
import { signUpFormSchema } from '../schemas/auth'
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
import { createWorkSpaceFn } from '../functions/workspace'

export default function SignUpForm() {
  const [isSignUpFormSubmitting, setIsSignUpFormSubmitting] = useState(false)
  const navigate = useNavigate()

  const signUpForm = useForm({
    defaultValues: { fullName: '', email: '', password: '' },
    validators: { onSubmit: signUpFormSchema },
    onSubmit: async ({ value }) => {
      setIsSignUpFormSubmitting(true)

      try {
        const res = await authClient.signUp.email({
          ...value,
          name: value.fullName,
          fetchOptions: {
            onError: ({ error }) => {
              toast.error(error.message)
            },
          },
        })

        if (res.data) {
          const user = res.data?.user!

          await createWorkSpaceFn({
            data: { userId: user.id, name: `Trello workspace`, type: 'Operations' },
          })

          navigate({ to: '/boards' })
          signUpForm.reset()
        }
      } catch {
        toast.error('Failed to sign up')
      } finally {
        setIsSignUpFormSubmitting(false)
      }
    },
  })

  return (
    <form
      id="sign-up-form"
      onSubmit={(e) => {
        e.preventDefault()
        signUpForm.handleSubmit()
      }}
      className="space-y-3"
    >
      <FieldGroup>
        <signUpForm.Field
          name="fullName"
          children={(field) => {
            const fieldStateMeta = field.state.meta
            const isInvalid =
              fieldStateMeta.isTouched && !fieldStateMeta.isValid

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>

                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  disabled={isSignUpFormSubmitting}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                />

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />

        <signUpForm.Field
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
                  disabled={isSignUpFormSubmitting}
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

        <signUpForm.Field
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
                  disabled={isSignUpFormSubmitting}
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
        disabled={isSignUpFormSubmitting}
      >
        Sign Up
      </Button>
    </form>
  )
}
