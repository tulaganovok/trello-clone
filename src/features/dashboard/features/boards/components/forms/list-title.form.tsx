import { Button } from '#/components/ui/button'
import { Field, FieldGroup } from '#/components/ui/field'
import type { ListWithCards } from '#/types/list'
import { useForm, useStore } from '@tanstack/react-form'
import { useEffect, useRef, useState, type RefObject } from 'react'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'
import { titleSchema } from '../../schemas/board'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { Route } from '#/routes/(dashboard)/board/$boardId'
import { Input } from '#/components/ui/input'
import ListOptions from './list-options'

interface ListTitleFormProps {
  list: ListWithCards
  onAddCard: () => void
}

export default function ListTitleForm({ list, onAddCard }: ListTitleFormProps) {
  const [isListTitleFormSubmitting, setIsListTitleFormSubmitting] =
    useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { boardId } = Route.useParams()
  const queryClient = useQueryClient()

  const listTitleForm = useForm({
    defaultValues: { title: list.title },
    validators: { onSubmit: titleSchema },
    onSubmit: async ({ value }) => {
      const titleValue = value.title.trim()

      if (!titleValue || titleValue === list.title) {
        setIsEditing(false)
        return
      }

      setIsListTitleFormSubmitting(true)

      try {
        await queryClient.invalidateQueries({ queryKey: ['board', boardId] })
        setIsEditing(false)
        listTitleForm.reset({ title: titleValue })
      } catch {
        toast.error('Failed to update the list title')
      } finally {
        setIsListTitleFormSubmitting(false)
      }
    },
  })

  const title = useStore(listTitleForm.store, (state) => state.values.title)

  const onKeyDown = (event: globalThis.KeyboardEvent) => {
    if (isListTitleFormSubmitting) return

    if (event.key === 'Escape') {
      setIsEditing(false)
      listTitleForm.reset()
    }
  }

  const onListTitleFormBlur = () => {
    if (isListTitleFormSubmitting) return

    const value = (title ?? '').trim()

    if (!value) {
      listTitleForm.reset()
      setIsEditing(false)
      return
    }

    listTitleForm.handleSubmit()
  }

  const onCloseListTitleForm = () => {
    setIsEditing(false)
    listTitleForm.reset()
  }

  useEventListener('keydown', onKeyDown)
  useOnClickOutside(inputRef as RefObject<HTMLElement>, onListTitleFormBlur)

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [isEditing])

  return (
    <div className="pt-1 px-2 font-semibold flex justify-between items-start gap-x-2 w-full">
      {isEditing ? (
        <form
          id="list-title-form"
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault()

            if (title.trim().length > 0) {
              listTitleForm.handleSubmit()
            } else {
              onCloseListTitleForm()
            }
          }}
        >
          <FieldGroup className="w-full">
            <listTitleForm.Field
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
                      disabled={isListTitleFormSubmitting}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      type="text"
                      autoComplete="off"
                      className="text-sm md:text-sm font-semibold h-8 focus:focus-visible:outline-0 focus-visible:ring-transparent rounded-xs  p-1 shadow-none w-full "
                    />
                  </Field>
                )
              }}
            />
          </FieldGroup>
        </form>
      ) : (
        <Button
          size={'sm'}
          variant={'ghost'}
          disabled={isListTitleFormSubmitting}
          onClick={() => setIsEditing(true)}
          className="flex-1 px-2.5 py-1 h-7 font-semibold border-transparent text-sm cursor-pointer justify-start hover:bg-secondary whitespace-normal wrap-break-word text-left"
        >
          {list.title}
        </Button>
      )}

      <ListOptions list={list} onAddCard={onAddCard} />
    </div>
  )
}
