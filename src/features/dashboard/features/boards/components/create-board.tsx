'use client'

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
import { X } from 'lucide-react'
import BoardForm from './forms/board.form'

interface CreateBoardProps {
  workspaceId: string
}

export default function CreateBoard({ workspaceId }: CreateBoardProps) {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <div
            role="button"
            className="bg-accent h-28 rounded-lg shadow-sm flex items-center hover:bg-neutral-200 cursor-pointer"
          >
            <h4 className="text-center text-muted-foreground mx-auto text-sm">
              Create new board
            </h4>
          </div>
        </PopoverTrigger>

        <PopoverContent side="right" className="p-3">
          <PopoverHeader className="py-1">
            <PopoverTitle className="text-center text-sm text-neutral-700 font-semibold">
              Create board
            </PopoverTitle>
            <PopoverDescription />
          </PopoverHeader>

          <PopoverClose asChild>
            <Button
              size={'icon-xs'}
              variant={'ghost'}
              className="absolute top-3 right-3 text-accent-foreground size-4 rounded-xs focus-visible:ring-0"
            >
              <X className="size-4" />
            </Button>
          </PopoverClose>

          <BoardForm workspaceId={workspaceId} />
        </PopoverContent>
      </Popover>
    </>
  )
}
