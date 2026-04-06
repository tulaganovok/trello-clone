import { Field, FieldGroup } from "#/components/ui/field"
import type { Card } from "#/generated/prisma/client"
import { cn } from "#/lib/utils"
import { Route } from "#/routes/(dashboard)/board/$boardId"
import { useForm } from "@tanstack/react-form"
import { useQueryClient } from "@tanstack/react-query"
import { AlignLeft } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { cardDescriptionSchema } from "../../schemas/card"
import { toast } from "sonner"
import { updateCardByIdFn } from "../../functions/card"
import { Textarea } from "#/components/ui/textarea"
import { Button } from "#/components/ui/button"

interface CardDescriptionFormProps {
  card: Card
}

export default function CardDescriptionForm({ card }: CardDescriptionFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [cardDescription, setCardDescription] = useState(card.description)

  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const queryClient = useQueryClient()
  const { boardId } = Route.useParams()

  const cardDescriptionForm = useForm({
    defaultValues: { description: cardDescription },
    validators: { onSubmit: cardDescriptionSchema },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true)

      try {
        await updateCardByIdFn({ data: { id: card.id, description: value.description || null } })

        await queryClient.invalidateQueries({ queryKey: ['board', boardId] })

        setCardDescription(value.description || null)
        disableEditing()
      } catch (error) {
        toast.error('Failed to update card description')
      } finally {
        setIsSubmitting(false)
      }
    }
  })

  const disableEditing = () => {
    setIsEditing(false)
    cardDescriptionForm.reset()
  }

  useEffect(() => {
    if (isEditing) {
      textareaRef.current?.focus()
      textareaRef.current?.select()
    }
  }, [isEditing])

  return (
    <div className='flex items-start gap-x-3 w-full'>
      <AlignLeft className='size-5 mt-0.5 text-accent-foreground' />

      <div className='w-full'>
        <p className='font-semibold text-accent-foreground mb-2'>Description</p>

        {isEditing ? (
          <form
            id='card-description-form'
            onSubmit={e => {
              e.preventDefault()
              cardDescriptionForm.handleSubmit()
            }}
          >
            <FieldGroup className='space-y-1'>
              <cardDescriptionForm.Field
                name="description"
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
                        value={field.state.value!}
                        disabled={isSubmitting}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder='Add a more detailed description...'
                        className='bg-secondary min-h-20 max-md:text-sm'
                      />

                    </Field>
                  )
                }}
              />

              <div className='flex items-center gap-x-2'>
                <Button type='submit' size={'sm'} disabled={isSubmitting}>
                  Save
                </Button>

                <Button
                  type='button'
                  size='sm'
                  variant={'outline'}
                  disabled={isSubmitting}
                  onClick={disableEditing}
                >
                  Cancel
                </Button>
              </div>
            </FieldGroup>
          </form>
        ) : (
          <div
            role='button'
            className={cn(
              'min-h-20 text-sm font-medium py-3 px-3.5 rounded-md bg-secondary cursor-pointer',
              !cardDescription && 'text-muted-foreground',
            )}
            onClick={() => setIsEditing(true)}
          >
            {cardDescription ?? 'Add a more detailed description...'}
          </div>
        )}
      </div>
    </div>
  )
}
