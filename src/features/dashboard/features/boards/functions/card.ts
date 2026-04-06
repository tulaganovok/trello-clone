import { authFnMiddleware } from '#/middleware/auth'
import { createServerFn } from '@tanstack/react-start'
import { createCardSchema, updateCardOrderSchema } from '../schemas/card'
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
