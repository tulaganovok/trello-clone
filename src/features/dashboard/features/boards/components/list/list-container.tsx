import { cn, reorder } from '#/lib/utils'
import type { ListWithCards } from '#/types/list'
import { DragDropContext, Droppable, type DropResult } from '@hello-pangea/dnd'
import { useEffect, useState } from 'react'
import { updateListOrderFn } from '../../functions/list'
import { useQueryClient } from '@tanstack/react-query'
import { updateCardOrderFn } from '../../functions/card'
import ListForm from '../forms/list.form'
import ListItem from './list-item'
import { Route } from '#/routes/(dashboard)/board/$boardId'
import CardModal from '../card/card-modal'

interface ListContainerProps {
  lists: ListWithCards[]
}

export default function ListContainer({ lists }: ListContainerProps) {
  const [orderedLists, setOrderedLists] = useState(lists)

  const [isDragging, setIsDragging] = useState(false)
  const queryClient = useQueryClient()
  const { boardId } = Route.useParams()

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, type } = result

    if (isDragging) return
    if (!destination) return
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return

    if (type === 'list') {
      const newOrderedLists = reorder(
        orderedLists,
        source.index,
        destination.index,
      ).map((list, index) => ({ ...list, order: index }))

      setOrderedLists(newOrderedLists)
      setIsDragging(true)

      await updateListOrderFn({ data: { lists: newOrderedLists } })
      await queryClient.invalidateQueries({ queryKey: ['board', boardId] })

      setIsDragging(false)
    }

    const newOrderedLists = [...orderedLists]

    const sourceList = newOrderedLists.find(
      (list) => list.id === source.droppableId,
    )
    const destinationList = newOrderedLists.find(
      (list) => list.id === destination.droppableId,
    )

    if (!sourceList || !destinationList) return

    if (source.droppableId === destination.droppableId) {
      const reorderedCards = reorder(
        sourceList.cards,
        source.index,
        destination.index,
      )

      reorderedCards.forEach((card, index) => {
        card.order = index
      })

      sourceList.cards = reorderedCards

      setOrderedLists(newOrderedLists)
      setIsDragging(true)

      await updateCardOrderFn({ data: { cards: reorderedCards } })
      await queryClient.invalidateQueries({ queryKey: ['board', boardId] })

      setIsDragging(false)
    } else {
      const [movedCard] = sourceList.cards.splice(source.index, 1)
      movedCard.listId = destination.droppableId
      destinationList.cards.splice(destination.index, 0, movedCard)

      sourceList.cards.forEach((card, index) => {
        card.order = index
      })

      destinationList.cards.forEach((card, index) => {
        card.order = index
      })

      setOrderedLists(newOrderedLists)
      setIsDragging(true)

      await updateCardOrderFn({ data: { cards: destinationList.cards } })
      await queryClient.invalidateQueries({ queryKey: ['board', boardId] })

      setIsDragging(false)
    }
  }

  useEffect(() => setOrderedLists(lists), [lists])

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={cn(isDragging && 'pointer-events-none opacity-80')}>
          <Droppable droppableId="lists" type="list" direction="horizontal">
            {(provided) => (
              <ol
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex gap-x-3 h-full relative"
              >
                {orderedLists.map((list, index) => (
                  <ListItem key={list.id} list={list} index={index} />
                ))}

                {provided.placeholder}

                <li className="shrink-0 h-full w-68 select-none">
                  <ListForm />
                </li>

                <div className="flex shrink-0 w-1" />
              </ol>
            )}
          </Droppable>
        </div>
      </DragDropContext>

      <CardModal />
    </>
  )
}
