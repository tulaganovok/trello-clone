import { Button } from '#/components/ui/button'
import { useForm } from '@tanstack/react-form'
import { Plus, X } from 'lucide-react'
import { useEffect, useRef, useState, type RefObject } from 'react'
import { titleSchema } from '../../schemas/board'
import { toast } from 'sonner'
import { Field, FieldGroup } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { Route } from '#/routes/(dashboard)/board/$boardId'
import { createListFn } from '../../functions/list'
import { useQueryClient } from '@tanstack/react-query'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

export default function ListForm() {
  const [isAdding, setIsAdding] = useState(false)
  const [isListFormSubmitting, setIsListFormSubmitting] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const formRef = useRef<HTMLFormElement | null>(null)
  const { boardId } = Route.useParams()
  const queryClient = useQueryClient()
  const [step, setStep] = useState(1)

  const listForm = useForm({
    defaultValues: { title: '' },
    validators: { onSubmit: titleSchema },
    onSubmit: async ({ value }) => {
      setIsListFormSubmitting(true)

      try {
        await createListFn({ data: { title: value.title, boardId } })
        await queryClient.invalidateQueries({ queryKey: ['board', boardId] })
        listForm.reset()
        setStep(prev => prev + 1)
      } catch {
        toast.error('Failed to create list')
      } finally {
        setIsListFormSubmitting(false)
      }
    },
  })

  const onCloseListForm = () => {
    if (!isAdding) return
    setIsAdding(false)
    listForm.reset()
  }

  const onKeyDown = (event: globalThis.KeyboardEvent) => {
    if (!isAdding) return

    if (event.key === 'Escape') {
      setIsAdding(false)
      listForm.reset()
    }
  }

  useEffect(() => {
    if (isAdding) {
      inputRef.current?.focus()
    }
  }, [isAdding, step])

  useEventListener('keydown', onKeyDown)
  useOnClickOutside(formRef as RefObject<HTMLElement>, onCloseListForm)

  if (isAdding)
    return (
      <form
        id="list-form"
        ref={formRef}
        className="w-full p-2 rounded-xl bg-secondary shadow-sm"
        onSubmit={(e) => {
          e.preventDefault()
          listForm.handleSubmit()
        }}
      >
        <FieldGroup>
          <listForm.Field
            name="title"
            children={(field) => {
              const fieldStateMeta = field.state.meta
              const isInvalid =
                fieldStateMeta.isTouched && !fieldStateMeta.isValid

              return (
                <Field data-invalid={isInvalid}>
                  <Input
                    ref={inputRef}
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    disabled={isListFormSubmitting}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    autoComplete="off"
                    placeholder="Enter list name..."
                    className="h-8 rounded-sm bg-background"
                  />
                </Field>
              )
            }}
          />

          <div className="flex items-center gap-2">
            <Button
              type="submit"
              size="sm"
              disabled={isListFormSubmitting}
              className="rounded-sm"
            >
              Add list
            </Button>

            <Button
              type="button"
              size={'icon-sm'}
              variant={'ghost'}
              className='rounded-sm hover:bg-black/10'
              disabled={isListFormSubmitting}
              onClick={onCloseListForm}
            >
              <X className="size-5" />
            </Button>
          </div>
        </FieldGroup>
      </form>
    )

  return (
    <Button
      variant={'ghost'}
      onClick={() => setIsAdding(true)}
      className="bg-background/50 hover:bg-background/70 w-full transition p-5 flex items-center font-medium justify-start text-sm rounded-xl"
    >
      <Plus className="size-4" />
      Add a list
    </Button>
  )
}
