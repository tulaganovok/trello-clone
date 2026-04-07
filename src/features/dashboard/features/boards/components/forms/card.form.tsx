import { Button } from '#/components/ui/button'
import { useForm, useStore } from '@tanstack/react-form'
import { Lightbulb, Plus, RotateCwSquare, X } from 'lucide-react'
import { titleSchema } from '../../schemas/board'
import { Route } from '#/routes/(dashboard)/board/$boardId'
import { useQueryClient } from '@tanstack/react-query'
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type RefObject,
} from 'react'
import { toast } from 'sonner'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'
import { Field, FieldGroup } from '#/components/ui/field'
import { Textarea } from '#/components/ui/textarea'
import { createCardFn } from '../../functions/card'

interface CardFormProps {
  listId: string
  isEditing: boolean
  enableEditing: () => void
  disableEditing: () => void
}

export default function CardForm({
  listId,
  isEditing,
  enableEditing,
  disableEditing,
}: CardFormProps) {
  const [isCardFormSubmitting, setIsCardFormSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const { boardId } = Route.useParams()
  const queryClient = useQueryClient()
  const [step, setStep] = useState(1)

  const cardForm = useForm({
    defaultValues: { title: '' },
    validators: { onSubmit: titleSchema },
    onSubmit: async ({ value }) => {
      const titleValue = value.title.trim()

      if (!titleValue) {
        disableEditing()
        cardForm.reset()
        return
      }

      setIsCardFormSubmitting(true)

      try {
        await createCardFn({ data: { title: titleValue, listId } })
        await queryClient.invalidateQueries({ queryKey: ['board', boardId] })
        setStep(prev => prev + 1)
        cardForm.reset()
      } catch {
        toast.error('Failed to create card')
      } finally {
        setIsCardFormSubmitting(false)
      }
    },
  })

  const title = useStore(cardForm.store, (state) => state.values.title)

  const onEnterListener = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      cardForm.handleSubmit()
    }
  }

  const onEscapeListener = (event: globalThis.KeyboardEvent) => {
    if (!isEditing || isCardFormSubmitting) return

    if (event.key === 'Escape') {
      disableEditing()
      cardForm.reset()
    }
  }

  const onCardFormBlur = () => {
    if (isCardFormSubmitting) return

    const value = (title ?? '').trim()

    if (!value) {
      cardForm.reset()
      disableEditing()
      return
    }

    cardForm.handleSubmit()
  }

  const onCloseCardForm = () => {
    disableEditing()
    cardForm.reset()
  }

  useEffect(() => {
    if (isEditing) {
      textareaRef.current?.focus()
    }
  }, [isEditing, step])

  useEventListener('keydown', onEscapeListener)
  useOnClickOutside(formRef as RefObject<HTMLElement>, onCardFormBlur)

  if (isEditing)
    return (
      <form
        id="card-form"
        ref={formRef}
        className="w-full bg-secondary"
        onSubmit={(e) => {
          e.preventDefault()
          cardForm.handleSubmit()
        }}
      >
        <FieldGroup>
          <cardForm.Field
            name="title"
            children={(field) => {
              const fieldStateMeta = field.state.meta
              const isInvalid =
                fieldStateMeta.isTouched && !fieldStateMeta.isValid

              return (
                <Field data-invalid={isInvalid}>
                  <Textarea
                    ref={textareaRef}
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    disabled={isCardFormSubmitting}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onKeyDown={onEnterListener}
                    aria-invalid={isInvalid}
                    className="resize-none text-sm px-2 py-1 min-h-14 bg-background"
                    placeholder="Enter a title"
                  />
                </Field>
              )
            }}
          />

          <div className="flex items-center gap-2">
            <Button
              type="submit"
              size="sm"
              disabled={isCardFormSubmitting}
              className="rounded-sm"
            >
              Add card
            </Button>

            <Button
              type="button"
              size={'sm'}
              disabled={isCardFormSubmitting}
              className="rounded-sm bg-purple-200 text-purple-950 hover:bg-purple-200 hover:text-purple-950"
            >
              <Lightbulb className="size-5 stroke-purple-950" />
              Tip
            </Button>

            <Button
              type="button"
              size={'icon-sm'}
              variant={'ghost'}
              className="rounded-sm hover:bg-black/10"
              disabled={isCardFormSubmitting}
              onClick={onCloseCardForm}
            >
              <X className="size-5" />
            </Button>
          </div>
        </FieldGroup>
      </form>
    )

  return (
    <div className="flex items-center gap-x-2">
      <Button
        size={'sm'}
        variant={'ghost'}
        className="w-full flex-1 justify-start text-muted-foreground text-sm hover:bg-black/10 group"
        disabled={isCardFormSubmitting}
        onClick={enableEditing}
      >
        <Plus className="size-4 stroke-muted-foreground group-hover:stroke-foreground" />
        Add a card
      </Button>

      <Button
        size={'icon-sm'}
        variant={'ghost'}
        className="rounded-md group hover:bg-black/10"
        disabled={isCardFormSubmitting}
      >
        <RotateCwSquare className="size-4 stroke-muted-foreground group-hover:stroke-foreground" />
      </Button>
    </div>
  )
}
