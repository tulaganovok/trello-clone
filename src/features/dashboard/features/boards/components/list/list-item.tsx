import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Draggable, Droppable } from '@hello-pangea/dnd'
import type { ListWithCards } from '#/types/list'
import CardItem from '../card/card-item'
import ListTitleForm from '../forms/list-title.form'
import CardForm from '../forms/card.form'

interface ListItemProps {
  index: number
  list: ListWithCards
}

export default function ListItem({ list, index }: ListItemProps) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="shrink-0 h-full w-68 select-none"
        >
          <div
            {...provided.dragHandleProps}
            className="w-full rounded-xl bg-secondary shadow-md pb-2 pt-1 space-y-2"
          >
            <ListTitleForm list={list} onAddCard={() => setIsEditing(true)} />

            <Droppable droppableId={list.id} type="card">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={cn(
                    'px-1 mx-1 mt-1',
                    list.cards.length > 0 && 'overflow-y-auto max-h-120',
                  )}
                >
                  <div
                    className={cn(
                      'flex flex-col gap-y-2 mb-2',
                      list.cards.length === 0 && 'hidden',
                    )}
                  >
                    {list.cards
                      .sort((a, b) => a.order - b.order)
                      .map((card, index) => (
                        <CardItem key={card.id} index={index} card={card} />
                      ))}
                  </div>

                  {provided.placeholder}

                  <CardForm
                    listId={list.id}
                    isEditing={isEditing}
                    enableEditing={() => setIsEditing(true)}
                    disableEditing={() => setIsEditing(false)}
                  />
                </div>
              )}
            </Droppable>
          </div>
        </li>
      )}
    </Draggable>
  )
}
