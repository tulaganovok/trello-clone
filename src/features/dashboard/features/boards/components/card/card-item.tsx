import type { Card } from '#/generated/prisma/client'
import { Draggable } from '@hello-pangea/dnd'
import { useCardModal } from '../../hooks/use-card-modal'

interface CardItemProps {
  index: number
  card: Card
}

export default function CardItem({ index, card }: CardItemProps) {
  const { onOpen } = useCardModal()

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={() => onOpen(card)}
          role="button"
          className="truncate border-2 border-transparent hover:border-primary py-2 px-3 text-sm bg-white rounded-md shadow-sm"
        >
          {card.title}
        </div>
      )}
    </Draggable>
  )
}
