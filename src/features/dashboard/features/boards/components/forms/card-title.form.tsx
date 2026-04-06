import type { Card } from "#/generated/prisma/client"
import { useForm } from "@tanstack/react-form"
import { useRef, useState } from "react"
import { titleSchema } from "../../schemas/board"
import { LayoutIcon } from "lucide-react"
import { Field, FieldGroup } from "#/components/ui/field"
import { Input } from "#/components/ui/input"
import { toast } from "sonner"
import { Route } from "#/routes/(dashboard)/board/$boardId"
import { useQueryClient } from "@tanstack/react-query"
import { updateCardByIdFn } from "../../functions/card"

interface CardTitleFormProps {
  card: Card
}

export default function CardTitleForm({ card }: CardTitleFormProps) {
  const [isCardTitleFormSubmitting, setIsCardTitleFormSubmitting] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { boardId } = Route.useParams()
  const queryClient = useQueryClient()

  const cardTitleForm = useForm({
    defaultValues: { title: card.title },
    validators: { onSubmit: titleSchema },
    onSubmit: async ({ value }) => {
      const newTitle = value.title.trim()
      if (!newTitle || newTitle === card.title) return

      setIsCardTitleFormSubmitting(true)

      try {
        await updateCardByIdFn({ data: { id: card.id, title: newTitle } })
        await queryClient.invalidateQueries({ queryKey: ['board', boardId] })
      } catch (error) {
        toast.error('Failed to update card title')
      } finally {
        setIsCardTitleFormSubmitting(false)
      }
    }
  })


  return (
    <div className='flex items-start gap-x-3 w-full'>
      <LayoutIcon className='size-5 mt-1 text-accent-foreground' />

      <div className='w-full mr-4'>
        <form id="card-title-form" onSubmit={e => {
          e.preventDefault()
          cardTitleForm.handleSubmit()
        }}>
          <FieldGroup>
            <cardTitleForm.Field
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
                      disabled={isCardTitleFormSubmitting}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={cardTitleForm.handleSubmit}
                      aria-invalid={isInvalid}
                      type="text"
                      autoComplete="off"
                      className='font-semibold text-xl md:text-xl p-0 text-accent-foreground bg-transparent not-focus-visible:border-none shadow-none relative -left-0.5 focus-visible:bg-white focus-visible:border-2 focus-visible:border-primary truncate aria-invalid:border-destructive aria-invalid:border-2'
                    />
                  </Field>
                )
              }}
            />
          </FieldGroup>
        </form>
      </div>
    </div>
  )
}
