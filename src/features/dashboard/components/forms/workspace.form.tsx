import { useForm } from '@tanstack/react-form'
import { createWorkspaceSchema } from '../../schemas/workspace'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select'
import { Textarea } from '#/components/ui/textarea'
import { Button } from '#/components/ui/button'
import { toast } from 'sonner'
import { createWorkspaceFn } from '../../functions/workspace'
import { useQueryClient } from '@tanstack/react-query'
import { useCreateWorkspace } from '../../hooks/use-create-workspace'

const workspaceTypes = [
  'Operations',
  'Marketing',
  'Human Resources',
  'Small Business',
  'Engineering-IT',
  'Education',
  'Sales CRM',
  'Other',
]

export default function WorkspaceForm() {
  const queryClient = useQueryClient()
  const { setIsOpen } = useCreateWorkspace()

  const workspaceForm = useForm({
    defaultValues: { name: '', type: '', description: '' },
    validators: {
      onChange: createWorkspaceSchema,
      onSubmit: createWorkspaceSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await createWorkspaceFn({ data: value })
        await queryClient.invalidateQueries({
          queryKey: ['workspaces', 'detailed-workspaces'],
        })

        toast.success('Workspace created successfully')
        setIsOpen(false)
        workspaceForm.reset()
      } catch (error) {
        toast.error('Failed to create a workspace')
      }
    },
  })

  const isWorkspaceFormSubmitting = workspaceForm.state.isSubmitting

  return (
    <form
      id="workspace-form"
      onSubmit={(e) => {
        e.preventDefault()
        workspaceForm.handleSubmit()
      }}
    >
      <FieldGroup className="space-y-4">
        <workspaceForm.Field
          name="name"
          children={(field) => {
            const fieldStateMeta = field.state.meta
            const isInvalid =
              fieldStateMeta.isTouched && !fieldStateMeta.isValid

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name} className="text-xs mb-0.5 ">
                  Workspace name
                </FieldLabel>

                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  disabled={isWorkspaceFormSubmitting}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Taco's Co."
                  autoComplete="name"
                  className="h-12 rounded-sm"
                />

                <FieldDescription className="text-xs pt-2">
                  This is the name of your company, team or organization.
                </FieldDescription>
              </Field>
            )
          }}
        />

        <workspaceForm.Field
          name="type"
          children={(field) => {
            const fieldStateMeta = field.state.meta
            const isInvalid =
              fieldStateMeta.isTouched && !fieldStateMeta.isValid

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name} className="text-xs mb-0.5">
                  Workspace type
                </FieldLabel>

                <Select
                  name={field.name}
                  value={field.state.value}
                  disabled={isWorkspaceFormSubmitting}
                  onValueChange={(value) => {
                    field.handleChange(value)
                    field.handleBlur()
                  }}
                  aria-invalid={isInvalid}
                >
                  <SelectTrigger className="data-placeholder:opacity-80 rounded-sm data-[size=default]:h-10">
                    <SelectValue placeholder="Choose..." />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {workspaceTypes.map((workspaceType, index) => (
                        <SelectItem key={index} value={workspaceType}>
                          {workspaceType}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            )
          }}
        />

        <workspaceForm.Field
          name="description"
          children={(field) => {
            const fieldStateMeta = field.state.meta
            const isInvalid =
              fieldStateMeta.isTouched && !fieldStateMeta.isValid

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name} className="text-xs mb-0.5 ">
                  Workspace description{' '}
                  <span className="text-muted-foreground ml-1">Optional</span>
                </FieldLabel>

                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  disabled={isWorkspaceFormSubmitting}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Our team organizes everything here."
                  className="min-h-32 rounded-sm"
                />

                <FieldDescription className="text-xs pt-2">
                  Get your members on board with a few words about your
                  Workspace.
                </FieldDescription>
              </Field>
            )
          }}
        />

        <workspaceForm.Subscribe
          selector={({ isValid, isTouched, isSubmitting }) => [
            isValid,
            isTouched,
            isSubmitting,
          ]}
          children={([isValid, isTouched, isSubmitting]) => (
            <Button
              type="submit"
              className="rounded-md h-12"
              disabled={!isValid || !isTouched || isSubmitting}
            >
              Continue
            </Button>
          )}
        />
      </FieldGroup>
    </form>
  )
}
