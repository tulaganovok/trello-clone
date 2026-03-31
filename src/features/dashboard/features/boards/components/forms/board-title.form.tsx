import type { Board } from '#/generated/prisma/client'
import { useForm, useStore } from '@tanstack/react-form'
import { titleSchema } from '../../schemas/board'
import { toast } from 'sonner'
import { useEffect, useRef, useState } from 'react'
import { Field, FieldError, FieldGroup } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { Button } from '#/components/ui/button'
import { useQueryClient } from '@tanstack/react-query'
import { updateBoardTitleFn } from '../../functions/board'

interface BoardTitleFormProps {
  board: Board
}

export default function BoardTitleForm({ board }: BoardTitleFormProps) {
  const [isBoardTitleFormSubmitting, setIsBoardTitleFormSubmitting] =
    useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const queryClient = useQueryClient()

  const boardTitleForm = useForm({
    defaultValues: { title: board.title },
    validators: { onSubmit: titleSchema },
    onSubmit: async ({ value }) => {
      const titleValue = value.title.trim()

      if (!titleValue || titleValue === board.title) {
        setIsEditing(false)
        return
      }

      setIsBoardTitleFormSubmitting(true)

      try {
        const updatedBoard = await updateBoardTitleFn({
          data: { boardId: board.id, title: titleValue },
        })

        document.title = updatedBoard.title

        await queryClient.invalidateQueries({ queryKey: ['board', board.id] })
        setIsEditing(false)
      } catch {
        toast.error('Failed to update the board title')
      } finally {
        setIsBoardTitleFormSubmitting(false)
      }
    },
  })

  const title = useStore(boardTitleForm.store, (state) => state.values.title)

  const onBoardTitleFormBlur = () => {
    if (isBoardTitleFormSubmitting) return

    const value = (title ?? '').trim()

    if (!value) {
      boardTitleForm.reset()
      setIsEditing(false)
      return
    }

    boardTitleForm.handleSubmit()
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      e.stopPropagation()

      boardTitleForm.reset()
      setIsEditing(false)
    }
  }

  const onCloseBoardTitleForm = () => {
    setIsEditing(false)
    boardTitleForm.reset()
  }

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [isEditing, board.title])

  useEffect(() => {
    boardTitleForm.reset({ title: board.title })
  }, [board.title])

  if (isEditing) {
    return (
      <form
        id="board-title-form"
        onSubmit={(e) => {
          e.preventDefault()

          if (title.trim().length > 0) {
            boardTitleForm.handleSubmit()
          } else {
            onCloseBoardTitleForm()
          }
        }}
      >
        <FieldGroup className="w-64">
          <boardTitleForm.Field
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
                    disabled={isBoardTitleFormSubmitting}
                    onBlur={onBoardTitleFormBlur}
                    onKeyDown={onKeyDown}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    type="text"
                    autoComplete="off"
                    className=" text-lg font-semibold h-7 focus:focus-visible:outline-0 focus-visible:ring-transparent border-none text-white rounded-xs md:text-lg p-1 shadow-none bg-transparent"
                  />

                  {fieldStateMeta.errors.length > 0 && (
                    <FieldError errors={fieldStateMeta.errors} />
                  )}
                </Field>
              )
            }}
          />
        </FieldGroup>
      </form>
    )
  }

  return (
    <Button
      size={'sm'}
      variant={'ghost'}
      disabled={isBoardTitleFormSubmitting}
      onClick={() => setIsEditing(true)}
      className="font-semibold text-lg size-auto hover:bg-white/20 hover:text-white rounded-xs"
    >
      {board.title}
    </Button>
  )
}
