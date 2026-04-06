import { authFnMiddleware } from '#/middleware/auth'
import { createServerFn } from '@tanstack/react-start'
import {
  createListSchema,
  listIdSchema,
  updateListOrderSchema,
} from '../schemas/list'
import { prisma } from '#/db'

export const createListFn = createServerFn({ method: 'POST' })
  .middleware([authFnMiddleware])
  .inputValidator(createListSchema)
  .handler(async ({ data }) => {
    const { title, boardId } = data

    const lastList = await prisma.list.findFirst({
      where: { boardId },
      orderBy: { order: 'desc' },
      select: { order: true },
    })

    const newOrder = lastList ? lastList.order + 1 : 1
    await prisma.list.create({
      data: { title, boardId, order: newOrder },
    })
  })

export const updateListOrderFn = createServerFn({ method: 'POST' })
  .middleware([authFnMiddleware])
  .inputValidator(updateListOrderSchema)
  .handler(async ({ data }) => {
    const transaction = data.lists.map((list) =>
      prisma.list.update({
        where: { id: list.id },
        data: { order: list.order },
      }),
    )

    await prisma.$transaction(transaction)
  })

export const copyListFn = createServerFn({ method: 'POST' })
  .middleware([authFnMiddleware])
  .inputValidator(listIdSchema)
  .handler(async ({ data }) => {
    const { listId } = data

    const listToCopy = await prisma.list.findUnique({
      where: { id: listId },
      include: { cards: true },
    })

    if (!listToCopy) return

    const lastList = await prisma.list.findFirst({
      where: { boardId: listToCopy.boardId },
      orderBy: { order: 'desc' },
      select: { order: true },
    })

    const newOrder = lastList ? lastList.order + 1 : 1

    await prisma.list.create({
      data: {
        title: `${listToCopy.title} - Copy`,
        boardId: listToCopy.boardId,
        order: newOrder,
        cards: {
          createMany: {
            data: listToCopy.cards.map((card) => ({
              title: card.title,
              description: card.description,
              order: card.order,
            })),
          },
        },
      },
      include: { cards: true },
    })
  })

export const deleteListByIdFn = createServerFn({ method: 'POST' })
  .middleware([authFnMiddleware])
  .inputValidator(listIdSchema)
  .handler(async ({ data }) => {
    await prisma.list.delete({ where: { id: data.listId } })
  })
