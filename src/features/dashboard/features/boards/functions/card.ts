import { authFnMiddleware } from '#/middleware/auth'
import { createServerFn } from '@tanstack/react-start'
import {
  cardIdSchema,
  createCardSchema,
  updateCardByIdSchema,
  updateCardOrderSchema,
} from '../schemas/card'
import { prisma } from '#/db'

export const createCardFn = createServerFn({ method: 'POST' })
  .middleware([authFnMiddleware])
  .inputValidator(createCardSchema)
  .handler(async ({ data }) => {
    const { title, listId } = data

    const lastCard = await prisma.card.findFirst({
      where: { listId },
      orderBy: { order: 'desc' },
      select: { order: true },
    })

    const newOrder = lastCard ? lastCard.order + 1 : 1
    await prisma.card.create({ data: { title, listId, order: newOrder } })
  })

export const updateCardOrderFn = createServerFn({ method: 'POST' })
  .middleware([authFnMiddleware])
  .inputValidator(updateCardOrderSchema)
  .handler(async ({ data }) => {
    const transaction = data.cards.map((card) =>
      prisma.card.update({
        where: { id: card.id },
        data: { order: card.order, listId: card.listId },
      }),
    )

    await prisma.$transaction(transaction)
  })

export const updateCardByIdFn = createServerFn({ method: 'POST' })
  .middleware([authFnMiddleware])
  .inputValidator(updateCardByIdSchema)
  .handler(async ({ data }) => {
    await prisma.card.update({ where: { id: data.id }, data })
  })

export const copyCardByIdFn = createServerFn({ method: 'POST' })
  .middleware([authFnMiddleware])
  .inputValidator(cardIdSchema)
  .handler(async ({ data }) => {
    const { cardId } = data

    const cardToCopy = await prisma.card.findUnique({ where: { id: cardId } })
    if (!cardToCopy) return

    const lastCard = await prisma.card.findFirst({
      where: { listId: cardToCopy.listId },
      orderBy: { order: 'desc' },
      select: { order: true },
    })

    const newOrder = lastCard?.order ? lastCard.order + 1 : 1

    await prisma.card.create({
      data: {
        title: `${cardToCopy.title} - Copy`,
        order: newOrder,
        listId: cardToCopy.listId,
        description: cardToCopy.description,
      },
    })
  })

export const deleteCardByIdFn = createServerFn({ method: 'POST' })
  .middleware([authFnMiddleware])
  .inputValidator(cardIdSchema)
  .handler(async ({ data }) => {
    const { cardId } = data
    await prisma.card.delete({ where: { id: cardId } })
  })
