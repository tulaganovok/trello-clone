import type { List } from '#/generated/prisma/client'
import { Route } from '#/routes/(dashboard)/board/$boardId'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { useQueryClient } from '@tanstack/react-query'
import { MoreHorizontal, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { copyListFn, deleteListByIdFn } from '../../functions/list'

interface ListOptionsProps {
  list: List
  onAddCard: () => void
}

export default function ListOptions({ list, onAddCard }: ListOptionsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)
  const { boardId } = Route.useParams()
  const queryClient = useQueryClient()

  const onAddCardClick = () => {
    onAddCard()
    closeBtnRef.current?.click()
  }

  const onCopyList = async () => {
    setIsLoading(true)

    try {
      await copyListFn({ data: { listId: list.id } })
      await queryClient.invalidateQueries({ queryKey: ['board', boardId] })
    } catch {
      toast.error('Failed to copy list')
    } finally {
      setIsLoading(false)
      closeBtnRef.current?.click()
    }
  }

  const onDeleteList = async () => {
    setIsLoading(true)

    try {
      await deleteListByIdFn({ data: { listId: list.id } })
      await queryClient.invalidateQueries({ queryKey: ['board', boardId] })
    } catch {
      toast.error('Failed to delete list')
    } finally {
      setIsLoading(false)
      closeBtnRef.current?.click()
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size={'icon-sm'}
          variant={'ghost'}
          className="rounded-md group hover:bg-black/10"
        >
          <MoreHorizontal className="size-4 stroke-muted-foreground group-hover:stroke-foreground" />
        </Button>
      </PopoverTrigger>

      <PopoverContent side="bottom" align="start" className="px-0 py-3">
        <PopoverHeader>
          <PopoverTitle className="text-neutral-600 text-center font-semibold">
            List Actions
          </PopoverTitle>
          <PopoverDescription className="hidden" />
        </PopoverHeader>

        <PopoverClose asChild ref={closeBtnRef}>
          <Button
            size={'icon-xs'}
            variant={'ghost'}
            className="absolute top-3 right-3"
          >
            <X className="size-4 text-muted-foreground" />
          </Button>
        </PopoverClose>

        <Button
          size={'sm'}
          variant={'ghost'}
          className="justify-start w-full rounded-none font-normal mt-3 hover:bg-black/5 "
          disabled={isLoading}
          onClick={onAddCardClick}
        >
          Add card
        </Button>

        <Button
          size={'sm'}
          variant={'ghost'}
          className="justify-start w-full rounded-none font-normal hover:bg-black/5 "
          disabled={isLoading}
          onClick={onCopyList}
        >
          Copy list
        </Button>

        <Separator className="my-2" />

        <Button
          size={'sm'}
          variant={'ghost'}
          className="justify-start w-full rounded-none text-destructive hover:text-destructive font-normal hover:bg-black/5 "
          disabled={isLoading}
          onClick={onDeleteList}
        >
          Delete this list
        </Button>
      </PopoverContent>
    </Popover>
  )
}
