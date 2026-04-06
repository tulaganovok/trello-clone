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
import CardTitleForm from '../forms/card-title.form'
import CardDescriptionForm from '../forms/card-description.form'
import { Route } from '#/routes/(dashboard)/board/$boardId'
import { useQueryClient } from '@tanstack/react-query'
import { copyCardByIdFn, deleteCardByIdFn } from '../../functions/card'

export default function CardModal() {
  const { card, onClose } = useCardModal()
  const [isPending, setIsPending] = useState(false)
  const { boardId } = Route.useParams()
  const queryClient = useQueryClient()

  const onCopyCard = async () => {
    setIsPending(true)

    try {
      await copyCardByIdFn({ data: { cardId: card?.id! } })
      await queryClient.invalidateQueries({ queryKey: ['board', boardId] })

      onClose()
    } catch {
      toast.error('Failed to copy card')
    } finally {
      setIsPending(false)
    }
  }

  const onDeleteCard = async () => {
    setIsPending(true)

    try {
      await deleteCardByIdFn({ data: { cardId: card?.id! } })
      await queryClient.invalidateQueries({ queryKey: ['board', boardId] })

      onClose()
    } catch {
      toast.error('Failed to delete card')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Dialog open={!!card} onOpenChange={onClose}>
      <DialogContent
        className="md:min-w-3xl top-[40%]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogTitle className="hidden" />
        <DialogDescription className="hidden" />

        {card && (
          <CardTitleForm card={card} />
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full">
              {card && (
                <CardDescriptionForm card={card} />
              )}
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
                <Trash className='stroke-destructive' />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
