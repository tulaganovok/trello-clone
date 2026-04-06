import { useState } from 'react'
import { toast } from 'sonner'
import { Copy, Trash } from 'lucide-react'
import { useCardModal } from '../../hooks/use-card-modal'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '#/components/ui/dialog'
import { Button } from '#/components/ui/button'

export default function CardModal() {
  const { card, isOpen, onClose } = useCardModal()
  const [isPending, setIsPending] = useState(false)

  const onCopyCard = async () => {
    setIsPending(true)

    try {
      //   await copyCardById(card?.id as string, params.boardId as string)
      toast.success('Card copied successfully')
      onClose()
    } catch {
      toast.error('Failed to copy card')
    } finally {
      setIsPending(true)
    }
  }

  const onDeleteCard = async () => {
    setIsPending(true)

    try {
      //   await deleteCardById(card?.id as string, params.boardId as string)
      toast.success('Card deleted successfully')
      onClose()
    } catch {
      toast.error('Failed to delete card')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="md:min-w-3xl top-[40%]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogTitle className="hidden" />
        <DialogDescription className="hidden" />

        {/* <CardTitleForm card={card} /> */}

        {card?.title}

        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full">
              {/* <CardDescriptionForm card={card} /> */}
            </div>
          </div>

          <div className="space-y-2 max-md:mt-6">
            <p className="text-base font-semibold text-accent-foreground">
              Actions
            </p>

            <div className="flex flex-row md:flex-col gap-2">
              <Button
                size={'sm'}
                variant={'secondary'}
                disabled={isPending}
                onClick={onCopyCard}
                className="justify-start"
              >
                <Copy />
                Copy
              </Button>

              <Button
                size={'sm'}
                variant={'secondary'}
                disabled={isPending}
                onClick={onDeleteCard}
                className="border-destructive hover:border-destructive text-destructive hover:text-destructive justify-start"
              >
                <Trash />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
