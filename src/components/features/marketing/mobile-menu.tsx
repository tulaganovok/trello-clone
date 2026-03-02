import { Button } from '#/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover>
      <PopoverTrigger asChild>
        {isOpen ? (
          <Button
            size={'icon-lg'}
            variant="ghost"
            onClick={() => setIsOpen(false)}
          >
            <X className="size-8" />
          </Button>
        ) : (
          <Button
            size={'icon-lg'}
            variant="ghost"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="size-8" />
          </Button>
        )}
      </PopoverTrigger>

      <PopoverContent
        side="bottom"
        sideOffset={11}
        className="min-w-screen h-[calc(100vh-60px)]"
      >
        <PopoverHeader>
          <PopoverTitle>Title</PopoverTitle>
          <PopoverDescription>Description text here.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  )
}
