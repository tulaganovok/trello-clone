import { z } from 'zod'

export const createCardSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(32, 'Title must be less than 32 characters'),
  listId: z.string(),
})

export const updateCardOrderSchema = z.object({
  cards: z.array(
    z.object({
      id: z.string(),
      order: z.number(),
      listId: z.string(),
      title: z.string(),
      description: z.string().nullable(),
      createdAt: z.date(),
      updatedAt: z.date(),
      checked: z.boolean(),
    }),
  ),
})

export const updateCardByIdSchema = z.object({
  id: z.string(),
  order: z.number().optional(),
  listId: z.string().optional(),
  title: z.string().optional(),
  description: z.string().nullable().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  checked: z.boolean().optional(),
})

export const cardDescriptionSchema = z.object({
  description: z.string().nullable(),
})

export const cardIdSchema = z.object({
  cardId: z.string(),
})
