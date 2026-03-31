import { useForm } from '@tanstack/react-form'
import { boardFormSchema } from '../../schemas/board'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '#/components/ui/field'
import { useEffect, useRef, useState } from 'react'
import { defaultImages } from '../../constants'
import { unsplash } from '#/lib/unsplash'
import { Input } from '#/components/ui/input'
import { Check } from 'lucide-react'
import { cn } from '#/lib/utils'
import { Button } from '#/components/ui/button'
import { Skeleton } from '#/components/ui/skeleton'
import { createBoardFn } from '../../functions/board'
import { toast } from 'sonner'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { PopoverClose } from '#/components/ui/popover'

interface BoardFormProps {
  workspaceId: string
}

export default function BoardForm({ workspaceId, }: BoardFormProps) {
  const [images, setImages] = useState<Record<string, any>[]>(defaultImages)
  const [isBoardFormSubmitting, setIsBoardFormSubmitting] = useState(false)
  const [isFetchingImages, setIsFetchingImages] = useState(false)
  const popoverCloseRef = useRef<HTMLButtonElement | null>(null)
  const location = useLocation()
  const navigate = useNavigate()

  const boardForm = useForm({
    defaultValues: { title: '', image: '' },
    validators: { onSubmit: boardFormSchema },
    onSubmit: async ({ value }) => {
      const [
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHtml,
        imageUserName,
      ] = value.image.split('|')

      setIsBoardFormSubmitting(true)

      try {
        const newBoard = await createBoardFn({
          data: {
            title: value.title,
            imageId,
            imageThumbUrl,
            imageFullUrl,
            imageLinkHtml,
            imageUserName,
            workspaceId,
          },
        })

        navigate({ to: '/board/$boardId', params: { boardId: newBoard.id } })
        boardForm.reset()
      } catch (error) {
        console.log(error)

        toast.error('Failed to create board')
      } finally {
        setIsBoardFormSubmitting(false)
      }
    },
  })

  useEffect(() => {
    const fetchImages = async () => {
      setIsFetchingImages(true)

      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ['317099'],
          count: 9,
        })

        if (result && result.response) {
          const newImages = result.response as Array<Record<string, any>>
          setImages(newImages)
        } else {
          console.error('Failed to get images from Unsplash')
        }
      } catch {
      } finally {
        setIsFetchingImages(false)
      }
    }

    fetchImages()
  }, [])

  useEffect(() => {
    if (location.pathname.startsWith('/board/')) {
      popoverCloseRef.current?.click()
    }
  }, [location.pathname])

  return (
    <form
      id="board-form"
      onSubmit={(e) => {
        e.preventDefault()
        boardForm.handleSubmit()
      }}
    >
      <FieldGroup>
        <boardForm.Field
          name="image"
          children={(field) => {
            const fieldStateMeta = field.state.meta
            const isInvalid =
              fieldStateMeta.isTouched && !fieldStateMeta.isValid

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-sm font-normal text-neutral-700"
                >
                  Select a wallpaper
                </FieldLabel>

                {isFetchingImages ? (
                  <div className="grid grid-cols-3 gap-2">
                    {Array.from({ length: 9 }).map((_, index) => (
                      <Skeleton
                        key={index}
                        className="h-12 w-full rounded-sm"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="relative">
                    <div className="grid grid-cols-3 gap-2">
                      {images.map((image) => {
                        const value = `${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`

                        const isSelected = field.state.value.startsWith(
                          image.id,
                        )

                        return (
                          <div
                            key={image.id}
                            onClick={() => {
                              if (isBoardFormSubmitting) return
                              field.handleChange(value)
                            }}
                            className={cn(
                              'cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted h-12',
                              isBoardFormSubmitting &&
                              'opacity-50 hover:opacity-50 cursor-auto',
                            )}
                          >
                            <Input
                              type="radio"
                              className="hidden"
                              checked={isSelected}
                              disabled={isBoardFormSubmitting}
                              value={value}
                              readOnly
                            />

                            <img
                              src={image.urls.thumb}
                              alt="Unsplash Image"
                              className="object-cover rounded-sm w-full h-12"
                            />

                            {isSelected && (
                              <div className="absolute inset-0 size-full bg-black/30 flex items-center justify-center">
                                <Check className="size-5 stroke-background" />
                              </div>
                            )}

                            <a
                              href={image.links.html}
                              target="_blank"
                              className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50"
                            >
                              {image.user.name}
                            </a>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {fieldStateMeta.errors && (
                  <FieldError errors={fieldStateMeta.errors} />
                )}
              </Field>
            )
          }}
        />

        <boardForm.Field
          name="title"
          children={(field) => {
            const fieldStateMeta = field.state.meta
            const isInvalid =
              fieldStateMeta.isTouched && !fieldStateMeta.isValid

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-sm font-normal text-neutral-700"
                >
                  Board title
                </FieldLabel>

                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  disabled={isBoardFormSubmitting}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  autoComplete="off"
                  placeholder="Enter board title"
                  className="h-8 rounded-sm"
                />

                {fieldStateMeta.errors && (
                  <FieldError errors={fieldStateMeta.errors} />
                )}
              </Field>
            )
          }}
        />

        <Button size={'sm'} className="w-full" disabled={isBoardFormSubmitting}>
          Create
        </Button>
        <PopoverClose ref={popoverCloseRef} className='hidden' />
      </FieldGroup>
    </form>

  )
}
