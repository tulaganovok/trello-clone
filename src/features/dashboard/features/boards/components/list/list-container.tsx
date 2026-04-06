import { cn, debounce, reorder, sortLists } from '#/lib/utils'
import type { ListWithCards } from '#/types/list'
import {
  DragDropContext,
  Droppable,
  type DropResult,
} from '@hello-pangea/dnd'
import { useEffect, useRef, useState } from 'react'
import { updateListOrderFn } from '../../functions/list'
import { updateCardOrderFn } from '../../functions/card'
import { useQueryClient } from '@tanstack/react-query'
import ListForm from '../forms/list.form'
import ListItem from './list-item'
import { Route } from '#/routes/(dashboard)/board/$boardId'
import CardModal from '../card/card-modal'

interface ListContainerProps {
  lists: ListWithCards[]
}

export default function ListContainer({ lists }: ListContainerProps) {
  const [orderedLists, setOrderedLists] = useState<ListWithCards[]>([])
  const queryClient = useQueryClient()
  const { boardId } = Route.useParams()

  const prevStateRef = useRef<ListWithCards[]>([])

  const rollback = () => {
    setOrderedLists(prevStateRef.current)
    queryClient.setQueryData(['board', boardId], (old: any) => ({
      ...old,
      lists: prevStateRef.current,
    }))
  }

  const syncCache = (lists: ListWithCards[]) => {
    queryClient.setQueryData(['board', boardId], (old: any) => ({
      ...old,
      lists,
    }))
  }

  const debouncedUpdateLists = useRef(
    debounce((lists: ListWithCards[]) => {
      updateListOrderFn({ data: { lists } }).catch(rollback)
    }, 400),
  ).current

  const debouncedUpdateCards = useRef(
    debounce((cards: any[]) => {
      updateCardOrderFn({ data: { cards } }).catch(rollback)
    }, 400),
  ).current

  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result

    if (!destination) return
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return

    prevStateRef.current = orderedLists

    if (type === 'list') {
      const newLists = reorder(
        orderedLists,
        source.index,
        destination.index,
      ).map((l, i) => ({
        ...l,
        order: i,
      }))

      setOrderedLists(newLists)
      syncCache(newLists)
      debouncedUpdateLists(newLists)

      return
    }

    const newLists = structuredClone(orderedLists)

    const sourceList = newLists.find(
      (l) => l.id === source.droppableId,
    )
    const destList = newLists.find(
      (l) => l.id === destination.droppableId,
    )

    if (!sourceList || !destList) return

    if (sourceList.id === destList.id) {
      const reordered = reorder(
        sourceList.cards,
        source.index,
        destination.index,
      )

      reordered.forEach((c, i) => (c.order = i))
      sourceList.cards = reordered

      setOrderedLists(newLists)
      syncCache(newLists)

      debouncedUpdateCards(reordered)
      return
    }

    const [moved] = sourceList.cards.splice(source.index, 1)

    moved.listId = destList.id
    destList.cards.splice(destination.index, 0, moved)

    sourceList.cards.forEach((c, i) => (c.order = i))
    destList.cards.forEach((c, i) => (c.order = i))

    setOrderedLists(newLists)
    syncCache(newLists)

    debouncedUpdateCards([
      ...sourceList.cards,
      ...destList.cards,
    ])
  }

  useEffect(() => {
    const sorted = sortLists(lists)
    setOrderedLists(sorted)
  }, [lists])

  useEffect(() => {
    return () => {
      debouncedUpdateCards.flush?.()
      debouncedUpdateLists.flush?.()
    }
  }, [])

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={cn('transition-opacity')}>
          <Droppable
            droppableId="lists"
            type="list"
            direction="horizontal"
          >
            {(provided) => (
              <ol
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex gap-x-3 h-full"
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